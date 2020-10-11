## Todo リストチュートリアル

### 1.React プロジェクトの作成

まず、React のプロジェクトを作成します。create-react-app を使います。

```
npx create-react-app <プロジェクト名>
npx create-react-app todo-list
```

（コミットには styled-components も含めています。後で使用するかもですが、今はなくても良いです。）

・ここまでのコミット-> `d08d3bca8d547d27d64b792a91f1f0b1bfbafe82`

### 2.Todo リストの親コンポーネント作成

まずは TODO リストの親コンポーネントを作成します。  
`/src/components/`ディレクトリ以下にコンポーネントファイルを作成します。

```TodoContainer.js
import React from 'react';

const TodoContainer = () => {
  return (
    <>
      <div className="list-container" />
      <button onClick={() => alert('Todoを追加する')}>Todo追加</button>
    </>
  );
};

export default TodoContainer;
```

単純に TODO リストを並べる箱と、追加のためのボタンを持たせているだけです。
先頭が空のタグ`<>`になっているものは、return される要素は一つでなければならないと言う制約があるからです。不要なタグをレンダリングしたくない時に使います。`React.Fragment`でも OK です。Fragment は属性をつけることができます。

スタイル

```index.cssに追加
.list-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  border: solid 1px #000000;
  width: 300px;
  height: 480px;
  background-color: #fff;
}
```

これで TODO リストの親コンポーネントが作成できました。
App.js に Todo リストコンポーネントを追加し、表示させてみます。

```
import React from 'react';
import './App.css';
import TodoContainer from './components/TodoContainer';

function App() {
  return (
    <div className="App">
      <TodoContainer />
    </div>
  );
}

export default App;

```

とりあえず外枠とボタンは表示されました。  
ボタンを押してもアラート表示がされるだけです。

・ここまでのコミット->`66ddf3ae3e6b7144b6c8a94614bd0e2e22a39249`

### 3-1.useState で状態を管理する

hooks の一つ、useState を使ってコンポーネントに状態を持たせます。  
TodoContainer に input の入力値と、Todo リストの二つの値を定義します。

[useState による定義](https://github.com/masaka-ghub/react-hooks-todo/commit/8071161a48bb66eeb2355258d718884bca55de65#diff-efaef22c970cf38cd94a7e2ec3c146f8L1-R7)

```
-import React from 'react';
+import React, { useState } from 'react';

 const TodoContainer = () => {
+  // 入力されたテキストを管理
+  const [input, setInput] = useState('');
+  // Todoリストを管理
+  const [todoItems, setTodoItems] = useState([]);
```

input を todoItems の二つと、それぞれの setter を useState を使用して定義しました。ここでは別々の値で定義していますが、オブジェクト型として一つにまとめる事もできます。

`const [stateObject, setStateObject] = useState({hoge: '', fuga: {}})`...と言った感じです。  
ただ、分けられるものは分けて定義した方が扱いやすいと思います。

useState は変数と setter をまとめて返します。書式は

```
const [state, setState] = useState(initialState);
```

です。input の初期値は\`\`, todoItems の初期値は[]として定義されました。

#### 3-2.setState で状態を変更する

テキスト入力で input の値を、button のクリックで todoItems の追加がされるようにしてみます。

[input,click のアクションで state を変化させる](https://github.com/masaka-ghub/react-hooks-todo/commit/8071161a48bb66eeb2355258d718884bca55de65#diff-efaef22c970cf38cd94a7e2ec3c146f8L1-R7)

これで button のクリック時、input した入力値を todoItems に追加するようになりました。

・ここまでのコミット->`22c5390232bb9f5df7596da4a527b0245b7a704e`

** handson **

1. ボタンをクリックして Todo リストに追加された時、入力した値が消えるようにしてください。
2. Todo リストを全て削除するボタンを追加してください。

#### 4 TodoItem を別のコンポーネントにする

Todo を別のコンポーネントにしておきます。

・ここまでのコミット->`a02b4b1b2847efd2acc8d5d86e94adcb318fc73a`

#### 5 useEffect を使う

Todo リストの件数表示を追加します。  
まず useState を使用して、管理するメッセージを追加します。

useEffect を使い、Todo リストの件数が変化した時にメッセージを変更させてみます。  
useEffect はコンポーネントのレンダリングが完了した後に自動的に処理される hooks です。ざっくり説明すると以下のような感じです。

- 第一引数は実行させたい関数
- 第二引数は実行される条件の配列、この配列に指定した値が前回と変わっていると実行される(空配列なら初回のみ)
- return される関数はこのコンポーネントがアンマウントされた時に実行されるクリーンアップ関数

```
useEffect(() => {
  //　コンポーネントがレンダリングされた時に実行される
  console.log('use effect');

  return () => {} // クリーンアップ関数
}, [/* ここに指定した値が変更されていると実行される */]);
```

クラスコンポーネントの

- componentDidMount
- componentDidUpdate
- componentWillUnMount

が一つにまとまったイメージです。

ここでは、Todo リストの件数が変更されていた場合にメッセージを変化させています。  
一般的には Ajax 処理をはじめとした非同期処理や、副作用を伴う処理は useEffect で行われます。

useEffectのcleanupに関しては、別のブランチ`react-todolist-sample_useeffect-cleanup`で例を挙げています。
`git checkout -b react-todolist-sample_useeffect-cleanup origin/react-todolist-sample_useeffect-cleanup`


・ここまでのコミット->`86e4f43010e809e2f53a182575b2c0864ac347d0`

----
#### 5-a-1.useEffect のクリーンアップ

useEffect の第一引数は関数ですが、この関数には必要なクリーンアップ関数を return させます。  
このクリーンアップ関数は、このコンポーネントがアンマウントされる前、またはこの useEffect が次回に実行される前に実行されます。  
useEffect には非同期処理や副作用のある処理が入ってくるので、このクリーンアップを適切に行わないと無駄な処理が続いたり、メモリを食い潰したりします。

この例では、`Timer`コンポーネントを追加しています。  
このコンポーネントの概要は下記を実行しています。

- 10 秒毎に NTP にリクエストし、現在時刻表示を更新

`timer表示ボタン`で Timer コンポーネントの有り無しを切り替えられます。

このコミット時点の`Timer`には、クリーンアップ関数が有りません。(useEffect 内で何も return していない)  
そのため、`timer表示ボタン`で現在時刻表示を消しても、setInterval が動き続けてしまいます。  
開発者ツールで console を表示し、`timer表示ボタン`を何度もクリックしてみると、`Timer`コンポーネントが表示された回数だけ NTP へのリクエストループが動き続ける様子がわかります。

#### 5-a-2.useEffect のクリーンアップ

`Timer`にクリーンアップを追加しました。  
表示を切り替える毎に、クリーンアップ関数が実行され、不要になった setInterval を止めています。

----

#### 6.useReducer を使う

次は useReducer です。  
Redux で使用していたような Reducer を作成し、そこに繋げる hooks です。
(Redux で使用していた Action,Reducer などほぼ使いまわせると思います)

Redux とは異なり、useState 同様 useReducer を定義したコンポーネントに管理されます。useState より複雑な値を管理したい時に使用されます。

まず、これまで useState で管理し、セッターで変更していた state を useReducer 使用に変更してみます。

・ここまでのコミット->`3c53ab4f2867e738a8a9b51572583e434fa69da8`

### 7.子コンポーネントから親コンポーネントの更新を行う

useReducer の続きになります。
Reducer の処理要求(dispatch)を子コンポーネントに渡せば、子のコンポーネントからコンポーネントの更新が行えます。

Todo それぞれおに削除ボタンを追加してみます。  
TodoItem コンポーネントに削除ボタンを追加しますが、クリックされた時に TodoList から自信を削除するような挙動です。  
TodoList は親コンポーネントの useReducer によって管理されています。

親コンポーネントから渡された Reducer への dispatch を使い、削除処理を実行しています。

・ここまでのコミット->`6381e453ec5db80805a6f3be43a4206c68492e1a`
