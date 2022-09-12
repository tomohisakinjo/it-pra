const form = document.getElementById("form");//フォームタグを取得
const input = document.getElementById("input");//インプットタグの取得
const ul = document.getElementById("ul");//ulタグの取得

const todos = JSON.parse(localStorage.getItem("todos"));    //todosを取得

if (todos){
    todos.forEach(todo => {           
        add(todo);            //保存データがある時、liタグを作成
    })
}

//フォームでエンターを押された時の処理
form.addEventListener("submit",function(event) {
    event.preventDefault();                       //ブラウザのリセットを止める処理
    add();                                        //liを追加
 }
);



//ulタグ内のliを作成処理
function add(todo) {                              //引数にtodoを定義
    let todoText = input.value;                   //入力内容を定義

    if(todo){
        todoText = todo.text;                          //データがある時、入力データに代入
    }
    
    //liを作成
    if (todoText){                                //値を入力された時
    const li = document.createElement("li");      //liを作成
    li.innerText = todoText;                      //入力内容をliに代入
    li.classList.add("list-group-item");          //liのクラス作成

    if(todo && todo.completed){                   //todoが同じなら
        li.classList.add("texts");                //クラスを作成
    }

    //右クリック時にイベント
    li.addEventListener("contextmenu", function(event){     
       event.preventDefault();                              //デフォルト画面を消去
       li.remove();                                         //liを削除
       saveData();                                          //削除したことを保存
    });

    //左クリック時にイベント
    li.addEventListener("click",function () {
       li.classList.toggle                    //クラスを追加
       ("texts");                             //cssにて棒線を入れる
       saveData();                            //保存
    });

    ul.appendChild(li);                           //ulタグの中にliを入れる処理
    input.value = "";                             //エンター押した後、中身をなくす処理
    saveData();                                   //データの保存
    }
}





function saveData() {
    const lists = document.querySelectorAll("li");         //listsにliを配列で定義
    let todos = [];                                        //空データ(listsの値のみを入れる)
    lists.forEach(list =>{          
        let todo = {                                       //listsで文章と棒線をオブジェクト化
            text: list.innerText,                          //文章定義
            completed: list.classList.contains             //棒線がある時定義
            ("texts")
        };
        
        todos.push(todo);                        //todoにlistの値を一つずつ追加処理
    });
    localStorage.setItem("todos",JSON.stringify(todos));   //ローカルストレージにtodosを保存
}
