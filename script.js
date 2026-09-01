const questions=[
 {q:"Quel est l’objectif principal du travail en équipe pluridisciplinaire ?",a:["Remplacer le rôle du ME","Croiser les regards et compétences pour accompagner au mieux la personne","Éviter toute prise de décision individuelle","Répartir uniquement les tâches administratives"],ok:1},
 {q:"Le partenariat se distingue du travail en équipe notamment parce qu’il implique souvent…",a:["Des acteurs appartenant à des structures ou secteurs différents","Uniquement des professionnels du même service","Seulement des professionnels médicaux","Aucune coordination"],ok:0},
 {q:"Dans une équipe, le moniteur-éducateur doit notamment…",a:["Agir seul","Transmettre des observations utiles et participer à la réflexion collective","Décider à la place de tous les professionnels","Ne jamais questionner les pratiques"],ok:1},
 {q:"Une transmission professionnelle doit être…",a:["Subjective et très personnelle","Factuelle, utile, respectueuse et centrée sur la personne","La plus longue possible","Réservée aux collègues proches"],ok:1},
 {q:"Dans une étude de cas BC3, une bonne réponse doit surtout montrer…",a:["Une récitation de cours","Une analyse de la situation, un positionnement professionnel et la mobilisation de connaissances","Une opinion personnelle sans justification","Une liste de lois sans lien avec la situation"],ok:1}
];
let current=0,score=0,answered=0,streak=0,level=1,mode="qcm",bc="BC3";
const $=id=>document.getElementById(id);
document.querySelectorAll(".bc-card").forEach(b=>b.onclick=()=>{document.querySelectorAll(".bc-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");bc=b.dataset.bc;});
document.querySelectorAll(".level").forEach(b=>b.onclick=()=>{document.querySelectorAll(".level").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");level=b.dataset.level; $("quizTag").textContent=`${bc} · ${["","Découverte","Maîtrise","Mobilisation","Certif","Boss"][level]}`;});
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll(".mode").forEach(x=>x.style.borderColor="");b.style.borderColor="var(--accent)";});
$("themeBtn").onclick=()=>document.body.classList.toggle("light");
$("startBtn").onclick=start;
function start(){current=0;score=0;answered=0;streak=0;render();$("startBtn").textContent="Recommencer la session 🔄";}
function render(){const x=questions[current%questions.length];$("question").textContent=x.q;$("qCount").textContent=`${current%questions.length+1}/${questions.length}`;$("answers").innerHTML=x.a.map((a,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join("");$("feedback").textContent="";document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(+b.dataset.i));}
function answer(i){const x=questions[current%questions.length];document.querySelectorAll(".answer").forEach(b=>b.disabled=true);document.querySelectorAll(".answer")[x.ok].classList.add("correct");if(i===x.ok){score+=10;streak++;$("feedback").textContent="✅ Exact ! +10 points";}else{streak=0;document.querySelectorAll(".answer")[i].classList.add("wrong");$("feedback").textContent="❌ Pas tout à fait — la bonne réponse est indiquée en vert."}answered++;$("score").textContent=score;$("answered").textContent=answered;$("streak").textContent=streak;setTimeout(()=>{current++;render()},900);}
