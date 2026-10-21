import {A,C,D,L,M,N,P,T,X,analyze,expression,type Expr,type Rel,type Analysis} from '../math/engine';
export const worlds=[
 {name:'Première coupure',short:'Affine',color:'#43e7d4',icon:'Ⅰ',intro:'Un facteur affine s’annule en −b/a. Le signe dépend du coefficient de x.'},
 {name:'Double impact',short:'Produits',color:'#60baff',icon:'Ⅱ',intro:'Étudie chaque facteur, puis multiplie les signes : deux signes identiques donnent +.'},
 {name:'Pièges de signes',short:'Multiplicités',color:'#ffb765',icon:'Ⅲ',intro:'Une puissance paire ne change pas de signe en traversant sa racine. Pense aux points isolés.'},
 {name:'L’assaut du second degré',short:'Trinômes',color:'#f282bb',icon:'Ⅳ',intro:'Calcule Δ = b² − 4ac. Deux racines si Δ > 0, une racine double si Δ = 0, aucune si Δ < 0.'},
 {name:'Zones interdites',short:'Quotients',color:'#b49aff',icon:'Ⅴ',intro:'Un zéro du dénominateur est toujours interdit, même si un facteur se simplifie.'},
 {name:'Chaos algébrique',short:'Combinaisons',color:'#f2da7a',icon:'Ⅵ',intro:'Combine les signes et les multiplicités. Garde chaque zéro du dénominateur exclu.'}
];
type Entry=[Expr,Rel,string];
const f=(r:number)=>L(1,-r),sq=(r:number)=>P(f(r),2),product=(a:number,b:number)=>M(f(a),f(b));
const plans:Entry[][]=[
 [
 [L(3,6),'>','Premier impact'],[L(1,-2),'≤','Bouclier inclus'],[L(-2,4),'≥','Sens inverse'],[L(1,3),'<','Borne ouverte'],
 [L(2,-6),'≥','Cap sur trois'],[L(-1,-1),'<','Passage à droite'],[L(4,0),'≤','Au point zéro'],[L(-3,9),'>','Avant la balise'],
 [L(2,3),'>','Première fraction'],[L(3,-2),'≤','Deux tiers'],[L(-2,-5),'≥','Coefficient négatif'],[L(4,-1),'<','Un quart'],
 [L(-4,6),'>','Trois demis'],[L(5,10),'≥','Retour à gauche'],[L(2,-1),'≤','Frontière fermée'],[L(-3,-6),'<','Double négation'],
 [L(3,1),'≥','Un tiers négatif'],[L(-5,5),'≤','Dernier virage'],[L(2,7),'>','Éclaireur'],[L(-4,3),'≥','Boss · Le gardien affine']
 ],
 [
 [product(-2,1),'≤','Deux lames'],[product(-1,3),'>','À l’extérieur'],[M(L(-1,2),f(-1)),'≥','Un facteur inversé'],[M(L(2,2),L(3,-6)),'<','Deux coefficients'],
 [product(0,4),'≥','Le zéro compte'],[product(-3,-1),'<','Entre les balises'],[M(f(3),f(-2)),'≤','Ordre inversé'],[N(product(1,4)),'>','Inversion globale'],
 [M(L(2,-1),f(-2)),'≥','Une racine fractionnaire'],[M(L(-2,3),L(2,1)),'≤','Deux fractions'],[product(-4,2),'≥','Deux frontières'],[product(-2,0),'>','Zéro exclu'],
 [M(L(-3,-3),L(-2,4)),'<','Deux facteurs négatifs'],[M(L(3,2),L(2,-3)),'≤','Racines exactes'],[product(1,2),'<','Couloir étroit'],[N(product(-3,3)),'≥','Symétrie trompeuse'],
 [product(-4,-2),'≤','Secteur négatif'],[M(L(4,-3),L(2,3)),'>','Sans arrondir'],[M(L(-1,-2),L(3,-9)),'≤','Portes inversées'],[M(L(-2,1),L(3,6)),'≥','Boss · Les deux sentinelles']
 ],
 [
 [sq(1),'≥','La racine double'],[N(sq(1)),'≥','Le point solitaire'],[N(sq(1)),'<','Le zéro fantôme'],[sq(-2),'<','Vide absolu'],
 [sq(3),'>','Presque toute la droite'],[P(f(-1),3),'≤','Trois impacts'],[M(sq(1),f(-2)),'≤','Traverser sans basculer'],[N(sq(-3)),'≤','Toute la droite'],
 [P(L(2,-1),2),'≤','Un demi solitaire'],[M(sq(-1),f(2)),'>','Le piège à gauche'],[M(f(-3),sq(2)),'≥','La double porte'],[M(sq(-2),sq(2)),'≤','Deux points seuls'],
 [N(M(sq(-1),sq(3))),'≥','Deux îlots'],[P(f(0),4),'>','Puissance quatre'],[N(P(f(2),3)),'<','Puissance impaire'],[M(P(f(-1),3),f(2)),'≥','Triple et simple'],
 [M(P(L(-2,1),2),f(-3)),'<','Carré inversé'],[M(sq(0),P(f(3),3)),'≤','Zéro et triple'],[N(M(sq(1),f(-2))),'≥','Dernier piège'],[M(sq(-2),sq(1),f(3)),'≤','Boss · Le miroir des signes']
 ],
 [
 [T(1,-5,6),'>','Scanner activé'],[T(1,0,1),'>','Sans coupure'],[T(1,0,1),'≤','Aucune solution'],[T(1,-2,1),'≤','Δ nul'],
 [T(-1,6,-9),'≥','Le sommet solitaire'],[T(1,1,-6),'≤','Deux racines opposées'],[T(-1,1,6),'<','Le signe de a'],[T(2,-6,4),'≥','Coefficient deux'],
 [T(4,0,-1),'<','Deux demis'],[T(1,2,5),'<','Discriminant négatif'],[T(-1,-2,-5),'≤','Toujours négatif'],[T(1,0,-9),'≥','Racines symétriques'],
 [T(2,1,-3),'>','Une fraction'],[T(4,-4,1),'≥','Carré parfait'],[T(-4,4,-1),'>','Impossible'],[T(3,-3,-6),'≤','Factoriser après Δ'],
 [T(1,5,6),'>','Deux racines négatives'],[T(-2,-2,12),'≥','Une parabole renversée'],[T(6,-5,1),'<','Un tiers et un demi'],[T(-2,1,3),'≤','Boss · Le discriminant']
 ],
 [
 [D(f(2),f(-1)),'≤','Premier portail'],[D(f(1),f(1)),'>','Domaine piégé'],[D(C(1),sq(2)),'≥','Pôle double'],[D(C(1),f(-2)),'<','Un seul pôle'],
 [D(sq(1),f(3)),'≤','Singleton et portail'],[D(f(-1),sq(2)),'≥','Pas de bascule au pôle'],[D(N(f(2)),f(-3)),'>','Quotient inversé'],[D(C(-2),sq(-1)),'≤','Toujours négatif, sauf ici'],
 [D(product(-2,1),f(1)),'≥','Un zéro supprimé'],[D(sq(1),sq(1)),'≤','Trou et ensemble vide'],[D(L(2,-1),L(2,3)),'<','Deux fractions'],[D(f(0),P(f(2),3)),'≥','Pôle triple'],
 [D(sq(-2),sq(3)),'>','Deux exceptions'],[D(N(sq(2)),f(-1)),'≥','Point solitaire à droite'],[D(product(-3,2),f(0)),'≤','Trois coupures'],[D(f(1),product(-2,3)),'>','Deux portails'],
 [D(M(f(-2),f(3)),M(f(-2),f(1))),'≥','Deux domaines'],[D(C(3),T(1,0,1)),'>','Aucun portail réel'],[D(sq(-1),f(-1)),'≤','Racine et pôle communs'],[D(M(L(-2,1),f(2)),sq(-1)),'≥','Boss · La porte interdite']
 ],
 [
 [D(M(f(-2),sq(1)),f(3)),'≥','L’assaut des signes'],[M(f(-3),f(0),f(2)),'<','Trois changements'],[D(M(sq(-1),f(2)),sq(3)),'≤','Deux multiplicités paires'],[N(M(sq(-2),sq(1))),'≥','Îlots jumeaux'],
 [D(T(1,-5,6),f(-1)),'>','Trinôme et portail'],[D(M(f(-2),sq(1)),P(f(3),2)),'≤','La porte ne bascule pas'],[M(f(-3),sq(0),f(2)),'≥','Quatre régions'],[D(P(f(1),3),product(-2,3)),'<','Cascade impaire'],
 [D(M(f(-2),f(1)),M(f(1),f(3))),'≤','La simplification trompeuse'],[D(N(M(sq(-1),sq(2))),f(3)),'≥','Deux points et un portail'],[D(T(4,0,-1),f(2)),'≤','Fractions en cascade'],[M(T(1,0,1),f(-2)),'>','Facteur toujours positif'],
 [D(M(f(-3),P(f(1),3)),sq(2)),'≥','Multiplicités croisées'],[D(sq(-1),M(f(0),sq(3))),'≤','Une île perdue'],[D(M(sq(-2),sq(1)),sq(3)),'<','Le vide résiste'],[D(N(M(sq(-2),sq(1))),sq(3)),'≥','Les deux derniers îlots'],
 [D(M(L(2,-1),sq(-2)),L(-2,3)),'≥','Frontières fractionnaires'],[D(M(T(1,-1,-2),f(-3)),sq(2)),'>','Le dernier scanner'],[D(M(P(f(-2),3),sq(1)),M(f(-2),f(3))),'≤','Domaine indélébile'],[D(M(f(-2),sq(1)),f(3)),'≥','Boss · Souverain des signes']
 ]
];
export type Level={id:string;world:number;index:number;expr:Expr;rel:Rel;title:string;seed:number;analysis:Analysis;label:string;boss:boolean;guided:boolean};
function make(expr:Expr,rel:Rel,world:number,index:number,title:string,seed:number):Level{return {id:`w${world+1}-${index+1}`,world,index,expr,rel,title,seed,analysis:analyze(expr,rel),label:`${expression(expr)} ${rel} 0`,boss:index===19,guided:index<3};}
export const campaign:Level[]=plans.flatMap((rows,w)=>rows.map(([e,r,title],i)=>make(e,r,w,i,title,1000+w*100+i)));
export function generated(world:number,seed:number):Level {let s=seed>>>0;const rng=()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s;};let a=(rng()%7)-3,b=(rng()%7)-3;if(a===b)b=a===3?-3:a+1;const r:Rel[]=['<','≤','>','≥'];const rel=r[rng()%4];const invert=rng()%2===0;let e:Expr;switch(world){case 0:e=L(invert?-2:2,-2*a*(invert?-1:1));break;case 1:e=product(a,b);break;case 2:e=rng()%2?sq(a):M(sq(a),f(b));break;case 3:e=rng()%3===0?T(1,0,1):T(1,-a-b,a*b);break;case 4:e=D(rng()%2?sq(a):f(a),rng()%2?sq(b):f(b));break;default:e=D(M(f(a),sq(b)),f(a===0?4:0));}if(invert)e=N(e);const lv=make(e,rel,world,0,'Signal procédural',seed);return {...lv,id:`g${world}-${seed}`,guided:false};}
export function dailySeed(date=new Date()):number{return Number(`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`);}
