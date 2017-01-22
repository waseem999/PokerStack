import React from 'react';


export default function (props) {
console.log("PROPS!", props)
return (
    <div>
        <table>
            <thead>
                <tr><strong>Community Cards</strong></tr>
            </thead>
                <tbody>
                    <tr>
                        <td><img src={props.communitycards[0].image} className="Image-logo"/><img src={props.communitycards[1].image} className="Image-logo"/><img src={props.communitycards[2].image} className="Image-logo"/>
                        {props.stage > 1 ? <img src={props.turn[0].image} className="Image-logo"/> : null}
                        {props.stage >= 3 ? <img src={props.river[0].image} className="Image-logo"/> : null}</td>
                    </tr>
                    
            </tbody>
        </table>
    </div>
   )
}