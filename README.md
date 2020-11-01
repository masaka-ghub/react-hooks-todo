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

useEffect の cleanup に関しては、別のブランチ`react-todolist-sample_useeffect-cleanup`で例を挙げています。
`git checkout -b react-todolist-sample_useeffect-cleanup origin/react-todolist-sample_useeffect-cleanup`

・ここまでのコミット->`86e4f43010e809e2f53a182575b2c0864ac347d0`

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

### 8.Context API と useContext の使用

異なるコンポーネント間で共通して状態を取り扱うため、context API と useContext を使用します。  
これまでは親のコンポーネントが持っている state(TodoState)を子コンポーネントでも参照するため、props と言う形で子のコンポーネントに必要な state を渡していました。  
useContext を使用し、Redux の様に props を介さずに異なるコンポーネントから共通の値にアクセスできる様にします。

まず、context を作成します。  
この context を export する事で、import したコンポーネントは共通的にこの context にアクセスできます。

```
export const TodoContext = createContext();
```

次に先ほど作成した TodoContext から provider を作成します。  
この **provider に渡す value が共通管理したい値です。**  
この例では前回に引き続き、useReducer による state を使用していますが、管理したい値が単純であれば useState でも構いません。

```
const TodoListProvider = ({ children }) => {
  const [todoState, dispatch] = useReducer(todoReducer, { todoItems: [], messge: '', lastId: 1 });
  // const [value, setValue] = useState('') の様なシンプルな値などでも良い

  return <TodoContext.Provider value={{ todoState, dispatch }}>{children}</TodoContext.Provider>;
};
```

※ここで出てくる children は React で用意されている[コンポジション](https://ja.reactjs.org/docs/composition-vs-inheritance.html)を利用しています。コンポーネントで囲まれた要素がそのまま入ってきます。

上の例だと、このタグ`<TodoListProvier><div>何か</div></TodoListProvider>`がそのまま children として渡ってきます。

作成した provider でこれまでの TodoContainer コンポーネントを囲ってあげます。

```
      <TodoListProvider>
        <TodoMessage />
        <TodoContainer />
      </TodoListProvider>
```

これで、TodoContainer 側から TodoContext にアクセスする準備ができました。  
TodoContainer 側から TodoContext にアクセスするために useContext を使用します。

```
/* TodoContainer */

  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);
```

これで、App.js で用意した context に TodoContainer からアクセスできる様になりました。

TodoContainer とは別のコンポーネントからもこの context を使用できる事を確認してみましょう。  
TodoContainer 内にある、`TodoList: ~件`のメッセージを TodoContainer の外に出してみます。

新たに TodoMessage.js を作成し、メッセージの表示と更新をこちらのコンポーネントに移動させます。

```
import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../App';

const TodoMessage = () => {
  // Appで作成したcontextを使う
  const { todoState, dispatch } = useContext(TodoContext);

  useEffect(() => {
    dispatch({ type: 'UPDATE_MESSAGE', message: `TODO LIST: ${todoState.todoItems.length}件` });
  }, [todoState.todoItems.length]);

  return <p>{todoState.message}</p>;
};

export default TodoMessage;
```

ほぼ TodoContainer から切り取ってきただけですが、TodoContainer 同様`useContext(TodoContext)`が有ります。

これを、TodoComponent の外に出します。

```
/* App.js */
function App() {
  return (
    <div className="App">
      <TodoListProvider>
        <TodoMessage />
        <TodoContainer />
      </TodoListProvider>
    </div>
  );
}
```

これで動かしてみると、これまで同様の動きを見せることと思います。  
state を context で管理することによって、異なるコンポーネントからアクセスできる様になりました。

・ここまでのコミット->`7d6d6d7b1f4d9a341ab2ca39305875f44330c985`
