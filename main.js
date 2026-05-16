let card=document.querySelector(".card");

if(card){

card.onclick=()=>{

card.classList.add("active");

}

}

function celebrate(){

for(let i=0;i<150;i++){

let p=document.createElement("div");

p.className="particle";

p.style.left="50%";
p.style.top="50%";

document.body.appendChild(p);

let x=(Math.random()-.5)*1200;
let y=(Math.random()-.5)*900;

p.animate(

[
{transform:"translate(0,0)",opacity:1},

{
transform:`translate(${x}px,${y}px)`,
opacity:0
}

],

{
duration:2000
}

);

setTimeout(()=>{

p.remove()

},2000);

}

}
