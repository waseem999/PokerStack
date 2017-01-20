import React from 'react';


export default function (props) {
console.log("plaermove?", props.playerMove)
return (
      <div className="row">
          <div className="col-xs-12 col-sm-12">
            <h1>Poker</h1>
          </div>
          <div className="col-xs-12 col-sm-12">
            <form onSubmit={props.handleSubmit} className="form-inline">
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
                  <button type="submit" className="btn-sm btn-custom">Check</button>
                  <button type="submit" className="btn-sm btn-custom">Fold</button>
          </div>
          
          {
            props.lowerbet ? <strong>REDUCE YOUR BET AMOUNT</strong> : null
          }
          <div>
            <strong>Pot Size: {props.potsize}</strong>
          </div>
          <div>
            <strong>{props.user} Chip Balance: {props.chips}</strong>
          </div>
          
{props.playerMove ? (<div><strong>Your turn - Bet, Check or Fold</strong>
</div>) : null}
                  <button className="btn-sm btn-custom" onClick={props.dealCards}>
                      <span className="hidden-xs">New Game</span>
                  </button>
                 
            <div>
               {
               props.yourcards[0] && 
                      (
                       <table width="700">
                          <thead>
                                <tr>
                                  <th>Your Cards</th>
                                  <th>Villain Cards</th>
                                </tr>
                          </thead>
                          <tbody>
                                  <tr>
                                    <td><img src={props.yourcards[0].image} className="Image-logo"/><img src={props.yourcards[1].image} className="Image-logo"/></td>
                                 
                                    <td><img src={props.villaincards[0].image} className="Image-logo"/><img src={props.villaincards[1].image} className="Image-logo"/></td>
                                  </tr>
                          </tbody>
                  </table>
                      )
               }
            </div>
            <div>
            <button type="submit" className="btn-sm btn-custom" 
                  onClick={ () => {location.href = '/'}}>Exit Game</button>   
            </div>
        </div>

    )

}