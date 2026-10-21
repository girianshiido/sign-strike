import {describe,it,expect} from 'vitest';
import {q,add,sub,mul,div,cmp,parse,fmt,neg,sign,sqrtQ} from '../math/exact';
import {A,C,D,L,M,N,P,T,X,analyze,evaluate,solution,accepts,type Expr,type Rel} from '../math/engine';
import {campaign,generated} from '../levels/catalog';
import {blank,validate,cutError,playerSet} from '../game/answer';
const f=(r:number)=>L(1,-r),sq=(r:number)=>P(f(r),2);
const references:[Expr,Rel,string][]=[
 [L(3,6),'>',']-2 ; +∞['],[L(-2,4),'≥',']-∞ ; 2]'],[M(f(-2),f(1)),'≤','[-2 ; 1]'],
 [N(sq(1)),'<',']-∞ ; 1[ ∪ ]1 ; +∞['],[N(sq(1)),'≥','{1}'],[T(1,0,1),'>','ℝ'],[T(1,0,1),'≤','∅'],
 [T(1,-5,6),'>',']-∞ ; 2[ ∪ ]3 ; +∞['],[D(f(2),f(-1)),'≤',']-1 ; 2]'],[D(f(1),f(1)),'>',']-∞ ; 1[ ∪ ]1 ; +∞['],
 [D(M(f(-2),sq(1)),f(3)),'≥',']-∞ ; -2] ∪ {1} ∪ ]3 ; +∞[']
];
describe('arithmétique rationnelle exacte',()=>{
 it('normalise les signes et réduit sans flottants',()=>{expect(q(12,-18)).toEqual(q(-2,3));expect(q(0,-6)).toEqual(q(0));expect(add(q(1,3),q(1,6))).toEqual(q(1,2));expect(div(q(2,3),q(-4,5))).toEqual(q(-5,6));expect(()=>q(1,0)).toThrow();expect(()=>div(q(1),q(0))).toThrow();});
 it('parse entiers, décimaux et fractions sans arrondi',()=>{expect(parse('−6/4')).toEqual(q(-3,2));expect(parse('-0.125')).toEqual(q(-1,8));expect(parse('2,5')).toEqual(q(5,2));expect(()=>parse('sqrt(2)')).toThrow();expect(()=>parse('1/0')).toThrow();expect(cmp(q(9007199254740993n),q(9007199254740992n))).toBe(1);});
 it('racines carrées exactes',()=>{expect(sqrtQ(q(4,9))).toEqual(q(2,3));expect(sqrtQ(q(2))).toBeNull();expect(sqrtQ(q(-1))).toBeNull();});
});
describe('onze références du cahier des charges',()=>{references.forEach(([e,r,expected],i)=>it(`référence ${i+1} : ${expected}`,()=>expect(solution(analyze(e,r))).toBe(expected)));});
function independent(e:Expr,r:Rel){const a=analyze(e,r);const c=a.critical;for(let i=0;i<a.signs.length;i++){const x=i===0?(c.length?sub(c[0].v,q(2)):q(0)):i===c.length?add(c[i-1].v,q(2)):div(add(c[i-1].v,c[i].v),q(2));const actual=sign(evaluate(e,x));expect(a.signs[i]).toBe(actual);expect(a.intervals[i]).toBe(accepts(actual,r));}for(let i=0;i<c.length;i++){if(c[i].forbidden){expect(()=>evaluate(e,c[i].v)).toThrow();expect(a.points[i]).toBe(false);}else{expect(evaluate(e,c[i].v).n).toBe(0n);expect(a.points[i]).toBe(accepts(0,r));}}}
describe('invariants et domaine d’origine',()=>{
 for(const r of ['<','≤','>','≥']as Rel[])for(const m of [1,2,3,4])it(`pôle d’ordre ${m}, relation ${r}`,()=>{const e=D(M(C(-3),P(f(-2),m)),P(f(1),m));independent(e,r);const a=analyze(e,r);expect(a.critical[1].forbidden).toBe(true);expect(a.signs[1]===a.signs[2]).toBe(m%2===0);});
 it('fusionne les zéros communs doubles et préserve les trous',()=>{const a=analyze(D(sq(1),sq(1)),'≥');expect(a.critical).toHaveLength(1);expect(a.critical[0].zero).toBe(2);expect(a.critical[0].pole).toBe(2);expect(solution(a)).toBe(']-∞ ; 1[ ∪ ]1 ; +∞[');});
 it('conserve le domaine dans les quotients imbriqués',()=>{const e=D(C(1),D(f(1),f(2)));const a=analyze(e,'≥');expect(a.critical.map(c=>c.forbidden)).toEqual([true,true]);independent(e,'≥');});
 it('conserve le domaine sous une puissance nulle',()=>{const e=P(D(C(1),f(1)),0);expect(solution(analyze(e,'>'))).toBe(']-∞ ; 1[ ∪ ]1 ; +∞[');independent(e,'>');});
 it('fusionne les cellules adjacentes, singletons multiples et extrêmes',()=>{expect(solution(analyze(N(M(sq(-2),sq(1))),'≥'))).toBe('{-2} ∪ {1}');expect(solution(analyze(sq(1),'≥'))).toBe('ℝ');expect(solution(analyze(C(0),'≤'))).toBe('ℝ');expect(solution(analyze(C(0),'>'))).toBe('∅');});
 it('refuse les radicaux hors périmètre et dénominateur identiquement nul',()=>{expect(()=>analyze(T(1,0,-2),'>')).toThrow(/irrationnelles/);expect(()=>analyze(D(C(1),C(0)),'>')).toThrow();});
});
describe('120 missions éditoriales',()=>{expect(campaign).toHaveLength(120);expect(new Set(campaign.map(l=>l.id)).size).toBe(120);for(const l of campaign)it(`${l.id} — ${l.title}`,()=>independent(l.expr,l.rel));});
describe('générateur reproductible et validation indépendante',()=>{for(let w=0;w<6;w++)it(`monde ${w+1} : 200 graines`,()=>{for(let seed=1;seed<=200;seed++){const l=generated(w,seed);independent(l.expr,l.rel);expect(generated(w,seed).label).toBe(l.label);expect(solution(generated(w,seed).analysis)).toBe(solution(l.analysis));}});});
describe('validation locale de la résolution',()=>{
 it('diagnostique la coupure avant les signes',()=>{const l=campaign[0],a=blank();a.cuts=[{value:'2',kind:'zero'}];expect(validate(l,a)?.kind).toBe('cuts');expect(cutError(l,a)).toContain('2');});
 it('distingue pôle, signe et point isolé',()=>{const l=campaign.find(l=>l.id==='w6-20')!;const a={cuts:l.analysis.critical.map(c=>({value:fmt(c.v),kind:(c.forbidden?'pole':'zero')as 'pole'|'zero'})),signs:[...l.analysis.signs],selected:[...l.analysis.intervals],points:[...l.analysis.points],scanner:''};expect(validate(l,a)).toBeNull();expect(playerSet(a)).toBe(solution(l.analysis));a.points[1]=false;expect(validate(l,a)?.kind).toBe('points');a.cuts[2].kind='zero';expect(validate(l,a)?.kind).toBe('cuts');});
});
