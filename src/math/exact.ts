export type Q = { n: bigint; d: bigint };
const abs = (n:bigint)=>n<0n?-n:n;
export function gcd(a:bigint,b:bigint):bigint { a=abs(a); b=abs(b); while(b){[a,b]=[b,a%b];} return a; }
export function q(n:bigint|number,d:bigint|number=1):Q { n=BigInt(n); d=BigInt(d); if(!d)throw Error('Division par zéro'); const g=gcd(n,d); return {n:n/g*(d<0n?-1n:1n),d:abs(d)/g}; }
export const add=(a:Q,b:Q)=>q(a.n*b.d+b.n*a.d,a.d*b.d);
export const neg=(a:Q)=>q(-a.n,a.d);
export const sub=(a:Q,b:Q)=>add(a,neg(b));
export const mul=(a:Q,b:Q)=>q(a.n*b.n,a.d*b.d);
export const div=(a:Q,b:Q)=>q(a.n*b.d,a.d*b.n);
export const cmp=(a:Q,b:Q)=>a.n*b.d<b.n*a.d?-1:a.n*b.d>b.n*a.d?1:0;
export const sign=(a:Q):number=>a.n<0n?-1:a.n>0n?1:0;
export const num=(a:Q)=>Number(a.n)/Number(a.d);
export const fmt=(a:Q)=>a.d===1n?String(a.n):`${a.n}/${a.d}`;
export function parse(s:string):Q { s=s.trim().replace(/−/g,'-').replace(',','.'); if(s.length>30)throw Error('Valeur trop longue'); if(/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(s)){const [a,b]=s.split('/');return q(BigInt(a.trim()),BigInt(b.trim()));} if(/^[+-]?\d+(\.\d{1,6})?$/.test(s)){const [a,b='']=s.split('.');return q(BigInt(a+b),10n**BigInt(b.length));} throw Error('Saisis un entier ou une fraction, par exemple -3/2.'); }
export function sqrtQ(a:Q):Q|null { if(a.n<0n)return null; function root(n:bigint){if(n<2n)return n; let x=n,y=(x+1n)/2n;while(y<x){x=y;y=(x+n/x)/2n;}return x;}const n=root(a.n),d=root(a.d);return n*n===a.n&&d*d===a.d?q(n,d):null; }
