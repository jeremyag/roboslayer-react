import Character from "./components/character/character.component";
import "./App.css";
import Button from "./components/button/button.component";
import ActionsList from "./components/actions-list/actions-list.component";
import { useState, useEffect } from "react";

const App = () => {
  const [player, setPlayer] = useState({
    imgId: Math.floor(Math.random() * 10),
    role: "Player",
    health: 100,
  });
  const [enemy, setEnemy] = useState({
    imgId: Math.floor(Math.random() * 10),
    role: "Enemy",
    health: 100,
  });
  const [gameController, setGameController] = useState({
    isGameFinished: false,
    showActionMenu: false,
    gameResult: "",
    actions: [],
  });

  console.log(gameController);
  /**
   * Hooks
   */
  useEffect(() => {
    if (player.health <= 0) {
      setGameController({
        ...gameController,
        isGameFinished: true,
        showActionMenu: false,
        gameResult: "You lose!",
      });
    } else if (enemy.health <= 0) {
      setGameController({
        ...gameController,
        isGameFinished: true,
        showActionMenu: false,
        gameResult: "You win!",
      });
    }
  }, [player, enemy]);

  /**
   * Helper functions
   */
  const attack = (target = "enemy", attackType = 0) => {
    let damage = 0;
    let message = ".";
    let doer = "player";
    switch (attackType) {
      case 1:
        damage = Math.floor(Math.random() * 20);
        message = " using the special attack.";
        break;
      default:
        damage = Math.floor(Math.random() * 10);
    }

    if (target === "enemy") {
      message = `Player hits the enemy with ${damage} damage${message}`;
      console.log(message);
      setEnemy({
        ...enemy,
        health: enemy.health - damage,
      });
    } else {
      doer = "enemy";
      message = `Enemy hits the player with ${damage} damage${message}`;
      console.log(message);
      setPlayer({
        ...player,
        health: player.health - damage,
      });
    }

    gameController.actions.push({
      doer,
      message,
    });
  };

  /**
   * Action Handlers
   */
  const startGameAction = () => {
    setGameController({
      isGameFinished: false,
      showActionMenu: true,
      gameResult: "",
      actions: [],
    });

    setPlayer({
      imgId: Math.floor(Math.random() * 10),
      role: "Player",
      health: 100,
    });

    setEnemy({
      imgId: Math.floor(Math.random() * 10),
      role: "Enemy",
      health: 100,
    });
  };

  const giveupAction = () => {
    console.log(`Player gave up!`);
    gameController.actions.push({
      doer: "player",
      message: "Player gave up!",
    });

    setPlayer({ ...player, health: 0 });
  };

  const heal = () => {
    let heal = Math.floor(Math.random() * 10);
    console.log(`Player heals ${heal}!`);
    gameController.actions.push({
      doer: "player",
      message: `Player heals ${heal} points!`,
    });

    setPlayer({
      ...player,
      health: player.health + heal,
    });
  };

  const actionHandler = (event) => {
    let action = event.target.name;
    switch (action) {
      case "Attack":
        attack("enemy");
        break;
      case "Special Attack":
        attack("enemy", 1);
        break;
      case "Heal":
        heal();
        break;
      default:
    }

    if (gameController.isGameFinished) return;

    // Enemy hit back
    attack("player", Math.floor(Math.random() * 2));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 class="app-title">ROBOSLAYER</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Character
              imgId={player.imgId}
              role={player.role}
              health={player.health}
              className="bg-primary"
            />
          </div>
          <div className="col-md-6">
            <Character
              imgId={enemy.imgId}
              role={enemy.role}
              health={enemy.health}
              className="bg-danger"
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {gameController.showActionMenu ? (
                  <div className="action-menu">
                    <Button
                      className="btn-danger"
                      actionName="Attack"
                      onClickHandler={actionHandler}
                    />
                    <Button
                      className="btn-warning"
                      actionName="Special Attack"
                      onClickHandler={actionHandler}
                    />
                    <Button
                      className="btn-success"
                      actionName="Heal"
                      onClickHandler={actionHandler}
                    />
                    <Button
                      className="btn-light"
                      actionName="Giveup"
                      onClickHandler={giveupAction}
                    />
                  </div>
                ) : (
                  <div className="main-menu">
                    {gameController.isGameFinished ? (
                      <h1>{gameController.gameResult}</h1>
                    ) : (
                      ""
                    )}
                    <Button
                      className="btn-primary"
                      actionName="Start New Game"
                      onClickHandler={startGameAction}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        {gameController.actions.length > 0 ? (
          <div className="row">
            <div className="col-md-12">
              <ActionsList actions={gameController.actions} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
