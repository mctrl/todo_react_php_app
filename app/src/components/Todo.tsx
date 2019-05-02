import React from 'react';

const Todo = ({ id, title, descr, user }) =>  {
    if (title) {
        return(
            <li> 
                <strong>{title}: </strong> {descr} - <i>{user}</i>
            </li>
        )
    } else {
        return(
            <li> 
                {descr} from <i>{user}</i>
            </li>
        ) 
    }

  
}

export default Todo;