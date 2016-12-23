import React from 'react';
import axios from 'axios';

export default function (props) {
return (
        
        <div className="col-md-4 col-md-offset-4">
             <button type="submit" className="btn btn-danger" 
            onClick={props.handleDelete}>Delete Account</button>
        </div>
    )

}