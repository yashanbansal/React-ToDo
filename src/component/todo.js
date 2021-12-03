import React, { useState, useEffect } from 'react';
import todo from '../images/todo.svg';
import ReactTypingEffect from 'react-typing-effect';

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }


    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }


    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }



    const removeAll = () => {
        setItems([]);
    }


    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <div>
                        <h1 style={{ color: "white", marginBottom: "40px", marginTop: "-50px", fontSize: "5rem", position: "fixed", marginLeft: "-120px" }}>
                            <ReactTypingEffect speed={100} eraseSpeed={100} eraseDelay={2000} typingDelay={100}
                                text={["ToDoList With React.."]} />
                        </h1>
                    </div>
                    <figure style={{ marginTop: "50px" }}>
                        <img src={todo} alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Items..✍"
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add item" onClick={addItem}></i> : <i className="fa fa-edit add-btn" title="Update item" onClick={addItem}></i>
                        }

                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="fa fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="fa fa-trash add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
