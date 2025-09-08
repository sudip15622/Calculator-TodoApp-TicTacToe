import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdEditSquare, MdDelete, MdCancel } from "react-icons/md";
import { FaFolderPlus } from "react-icons/fa6";
import { IoSave } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";
import "./Todoapp.css";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const [edited, setedited] = useState("")
  const [todisable, settodisable] = useState(false)
  const [isadding, setisadding] = useState(false);


  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring != null) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }

  }, [])

  const savetoLS = (updatedtodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
    setisadding(false);
  }

  const handleadd = () => {
    const newTodo = { id: uuidv4(), todo, iscompleted: false, isediting: false };
    const updatedTodos = [...todos, newTodo];
    settodos(updatedTodos);
    savetoLS(updatedTodos);
    settodo("");
    setisadding(true);
  }
  const handledelete = (id) => {
    let newtodos = todos.filter(item => {
      return item.id != id;
    })
    settodos(newtodos);
    savetoLS(newtodos);
  }
  const handleedit = (id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isediting = !newtodos[index].isediting;
    settodos(newtodos);

    setedited(newtodos[index].todo);
    settodisable(!todisable);
    setisadding(false);
  }
  const handlesaveedit = (id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].todo = edited;
    newtodos[index].isediting = !newtodos[index].isediting;
    settodos(newtodos);
    savetoLS(newtodos);
    setedited("");
    settodisable(!todisable);
  }

  const handleeditchange = (e) => {
    setedited(e.target.value);
  }
  const handlechange = (e) => {
    settodo(e.target.value);
  }

  const handlecompleted = (id) => {
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted;
    settodos(newtodos);
    savetoLS(newtodos);
  }

  const handlefinished = () => {
    setshowfinished(!showfinished);
    setisadding(false);
  }
  const handleaddclick = ()=>{
    setisadding(!isadding);
  }

  return (
    <>
      <div className="todocontainer">
        {/* <div className="navbar">TODO APP</div> */}
        <div className="about-todo">
          <div className="addtodo">
            {/* <div className='text'>Add Todo</div> */}
            <div className="add">
              <form action="#">
                {isadding?<input autoFocus={isadding} onChange={handlechange} value={todo} type="text" name="newtodo" id="newtodo" required />:<button type='button' className='btn inputtodobtn' onClick={handleaddclick}>Add Todo</button>}
                <button className='btn addbtn' onClick={handleadd} disabled={todo.length < 1}><FaFolderPlus /></button>
              </form>
            </div>
          </div>
          <div className="line"></div>
          <div className="showtodos">
            {todos.length == 0 ? <div className='emptytodo'>No Todos to show</div> : <>
              <div className="showfinished">
                <button className={showfinished?"check":"uncheck"} onClick={handlefinished}>{showfinished?<FaCheckCircle />:<ImRadioUnchecked />}</button>
                <div className="showfinishedtext">Show finished Todos</div>
              </div>
              <div className="text">Your Todos</div>
              <div className="todoslist">
                {todos.map((item, index) => {
                  return (showfinished || !item.iscompleted) && (item.isediting ? (
                    <form action='#' key={index} className='todo editform'>
                      <div className="inputtodo">
                        <button type='button' className={item.iscompleted?"uncheck":"check"} onClick={()=>{handlecompleted(item.id)}} id={item.id} disabled >{item.iscompleted?<MdCancel />:<FaCheckCircle />}</button>
                        <input autoFocus={todisable} type="text" name="" className='editinput' value={edited} onChange={handleeditchange} />
                      </div>
                      <div className="buttons">
                        <button type='submit' className='btn savebtn' onClick={(e) => {
                          e.preventDefault();
                          handlesaveedit(item.id);
                        }} disabled={edited.length < 1}><IoSave /></button>
                        <button type='button' className='btn deletebtn' onClick={() => { handledelete(item.id) }}><MdDelete /></button>
                      </div>
                    </form>
                  ) : (
                    <div key={index} className={"todo" + (item.iscompleted ? " comtodo" : "")}>
                      <div className="inputtodo">
                      <button className={item.iscompleted?"uncheck":"check"} onClick={()=>{handlecompleted(item.id)}} id={item.id} >{item.iscompleted?<MdCancel />:<FaCheckCircle />}</button>
                        <div className={"todotext" + (item.iscompleted ? " cutline" : "")} >{item.todo}</div>
                      </div>
                      <div className="buttons">
                        <button className='btn editbtn' onClick={() => { handleedit(item.id) }} disabled={todisable}><MdEditSquare /></button>
                        <button className='btn deletebtn' onClick={() => { handledelete(item.id) }}><MdDelete /></button>
                      </div>
                    </div>
                  ))
                })}
              </div>
            </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
