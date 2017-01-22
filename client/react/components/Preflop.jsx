import React from 'react';


export default function (props) {
return (
      <div className="row">
          <div className="col-xs-12 col-sm-12" style={{ textAlign: "center"}}>
            <h1>Poker</h1>
          </div>
          <div className="col-xs-12 col-sm-12" style={{ textAlign: "center"}}>
                  <form onSubmit={props.handleBet} className="form-inline">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="bet">Bet</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={props.handleChange}
                            id="bet"
                            value={props.inputValue}
                            placeholder="Bet Amount" />
                          </div>
                    </div>
                        <button type="submit" className="btn-sm btn-custom">Bet</button>
                  </form>
                {props.villainAction==="bet" ? (
                <button type="submit" className="btn-sm btn-custom" onClick={props.handleCheck}>Call {props.currentBet}</button>) :
                (<button type="submit" className="btn-sm btn-custom" onClick={props.handleCheck}>Check</button>)
                 }
                  <button type="submit" className="btn-sm btn-custom" onClick={props.handleFold}>Fold</button>
          </div>
          
          {
            props.lowerbet ? <strong>REDUCE YOUR BET AMOUNT</strong> : null
            }
              <div style={{ fontSize: "1.2em", textAlign:"center"}}>
                  <div>
                    <strong>Pot Size: {props.potsize}</strong>
                  </div>
                  <div>
                    <strong>{props.user} Chip Balance: {props.chips}</strong>
                  </div>
                  <div>
                    <strong>Villain Chip Balance: {props.villainchips}</strong>
                  </div>
                  {
                    props.playerMove ? (<div><strong>Your turn - Bet, Check or Fold</strong>
                  </div>) : null}
                  <div></div>
              </div>       
                        
            <div style={{backgroundColor : "#9ACD32"}}>
               {
               props.yourcards[0] && 
                      (
                       <table width="700">
                          <thead style={{fontSize: "1.1em"}}>
                                <tr>
                                  <th>Your Cards</th>
                                  <th>Villain Cards</th>
                                </tr>
                          </thead>
                          <tbody>
                                  <tr>
                                    <td><img src={props.yourcards[0].image} className="Image-logo"/><img src={props.yourcards[1].image} className="Image-logo"/></td>
                                    {!props.result ? (<td><img src={"stylesheets/playingcards/card.jpeg"} className="Image-logo"/><img src={"stylesheets/playingcards/card.jpeg"} className="Image-logo"/></td>) :
                                    (<td><img src={props.villaincards[0].image} className="Image-logo"/><img src={props.villaincards[1].image} className="Image-logo"/></td>)}
                                  </tr>
                          </tbody>
                  </table>
                      )
               }
            </div>
            <div> 
            </div>
        </div>

    )

}