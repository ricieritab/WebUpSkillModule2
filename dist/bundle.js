(()=>{"use strict";const{elementById:e,elementsByClassName:t,addFilterToNodeList:n}=require("./utils"),{newGame:r}=require("./game"),{nextPlayer:i,playIfFree:o}=require("./game_controller");!function(){const a=t("square");function s(){const t=i().NEXT_PLAYER;e("feedback").textContent=`Player ${t} turn`}a.forEach((function(e,t){e.addEventListener("click",(()=>{!function(e){const t=t(),n=e.getAttribute("position");var r;r=o(t,n).GAME,a.forEach(((e,t)=>{updateGamePosition(r,t+1)})),s()}(this)}))})),n(),r(),s()}()})();