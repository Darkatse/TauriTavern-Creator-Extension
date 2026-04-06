//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/* @__NO_SIDE_EFFECTS__ */
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ee = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, E = te((e) => e.replace(re, "-$1").toLowerCase()), ie = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = te((e) => e ? `on${ie(e)}` : ""), D = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, O = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, se = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, le, ue = () => le ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function de(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? he(r) : de(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var fe = /;(?![^(]*\))/g, pe = /:([^]+)/, me = /\/\*[^]*?\*\//g;
function he(e) {
	let t = {};
	return e.replace(me, "").split(fe).forEach((e) => {
		if (e) {
			let n = e.split(pe);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function k(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = k(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var ge = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", _e = /* @__PURE__ */ e(ge);
ge + "";
function ve(e) {
	return !!e || e === "";
}
function ye(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = be(e[r], t[r]);
	return n;
}
function be(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ye(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !be(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function xe(e, t) {
	return e.findIndex((e) => be(e, t));
}
var Se = (e) => !!(e && e.__v_isRef === !0), A = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? Se(e) ? A(e.value) : JSON.stringify(e, Ce, 2) : String(e), Ce = (e, t) => Se(t) ? Ce(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[we(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => we(e)) } : _(t) ? we(t) : v(t) && !d(t) && !C(t) ? String(t) : t, we = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, j, Te = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = j, !e && j && (this.index = (j.scopes ||= []).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = j;
			try {
				return j = this, e();
			} finally {
				j = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = j, j = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (j = this.prevScope, this.prevScope = void 0);
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ee() {
	return j;
}
var M, De = /* @__PURE__ */ new WeakSet(), Oe = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, j && j.active && j.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, De.has(this) && (De.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Me(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ge(this), Fe(this);
		let e = M, t = Ve;
		M = this, Ve = !0;
		try {
			return this.fn();
		} finally {
			Ie(this), M = e, Ve = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) ze(e);
			this.deps = this.depsTail = void 0, Ge(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? De.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Le(this) && this.run();
	}
	get dirty() {
		return Le(this);
	}
}, ke = 0, Ae, je;
function Me(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = je, je = e;
		return;
	}
	e.next = Ae, Ae = e;
}
function Ne() {
	ke++;
}
function Pe() {
	if (--ke > 0) return;
	if (je) {
		let e = je;
		for (je = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Ae;) {
		let t = Ae;
		for (Ae = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Fe(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ie(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), ze(r), Be(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Le(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Re(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Re(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ke) || (e.globalVersion = Ke, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Le(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = M, r = Ve;
	M = e, Ve = !0;
	try {
		Fe(e);
		let n = e.fn(e._value);
		(t.version === 0 || D(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		M = n, Ve = r, Ie(e), e.flags &= -3;
	}
}
function ze(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) ze(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Be(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ve = !0, He = [];
function Ue() {
	He.push(Ve), Ve = !1;
}
function We() {
	let e = He.pop();
	Ve = e === void 0 ? !0 : e;
}
function Ge(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = M;
		M = void 0;
		try {
			t();
		} finally {
			M = e;
		}
	}
}
var Ke = 0, qe = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Je = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!M || !Ve || M === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== M) t = this.activeLink = new qe(M, this), M.deps ? (t.prevDep = M.depsTail, M.depsTail.nextDep = t, M.depsTail = t) : M.deps = M.depsTail = t, Ye(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = M.depsTail, t.nextDep = void 0, M.depsTail.nextDep = t, M.depsTail = t, M.deps === t && (M.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Ke++, this.notify(e);
	}
	notify(e) {
		Ne();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Pe();
		}
	}
};
function Ye(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ye(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Xe = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ Symbol(""), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol("");
function N(e, t, n) {
	if (Ve && M) {
		let t = Xe.get(e);
		t || Xe.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Je()), r.map = t, r.key = n), r.track();
	}
}
function et(e, t, n, r, i, a) {
	let o = Xe.get(e);
	if (!o) {
		Ke++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Ne(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === $e || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get($e)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "delete":
				i || (s(o.get(Ze)), f(e) && s(o.get(Qe)));
				break;
			case "set":
				f(e) && s(o.get(Ze));
				break;
		}
	}
	Pe();
}
function tt(e) {
	let t = /* @__PURE__ */ P(e);
	return t === e ? t : (N(t, "iterate", $e), /* @__PURE__ */ Vt(e) ? t : t.map(Wt));
}
function nt(e) {
	return N(e = /* @__PURE__ */ P(e), "iterate", $e), e;
}
function rt(e, t) {
	return /* @__PURE__ */ Bt(e) ? Gt(/* @__PURE__ */ zt(e) ? Wt(t) : t) : Wt(t);
}
var it = {
	__proto__: null,
	[Symbol.iterator]() {
		return at(this, Symbol.iterator, (e) => rt(this, e));
	},
	concat(...e) {
		return tt(this).concat(...e.map((e) => d(e) ? tt(e) : e));
	},
	entries() {
		return at(this, "entries", (e) => (e[1] = rt(this, e[1]), e));
	},
	every(e, t) {
		return st(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return st(this, "filter", e, t, (e) => e.map((e) => rt(this, e)), arguments);
	},
	find(e, t) {
		return st(this, "find", e, t, (e) => rt(this, e), arguments);
	},
	findIndex(e, t) {
		return st(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return st(this, "findLast", e, t, (e) => rt(this, e), arguments);
	},
	findLastIndex(e, t) {
		return st(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return st(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return lt(this, "includes", e);
	},
	indexOf(...e) {
		return lt(this, "indexOf", e);
	},
	join(e) {
		return tt(this).join(e);
	},
	lastIndexOf(...e) {
		return lt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return st(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ut(this, "pop");
	},
	push(...e) {
		return ut(this, "push", e);
	},
	reduce(e, ...t) {
		return ct(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ct(this, "reduceRight", e, t);
	},
	shift() {
		return ut(this, "shift");
	},
	some(e, t) {
		return st(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ut(this, "splice", e);
	},
	toReversed() {
		return tt(this).toReversed();
	},
	toSorted(e) {
		return tt(this).toSorted(e);
	},
	toSpliced(...e) {
		return tt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ut(this, "unshift", e);
	},
	values() {
		return at(this, "values", (e) => rt(this, e));
	}
};
function at(e, t, n) {
	let r = nt(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Vt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ot = Array.prototype;
function st(e, t, n, r, i, a) {
	let o = nt(e), s = o !== e && !/* @__PURE__ */ Vt(e), c = o[t];
	if (c !== ot[t]) {
		let t = c.apply(e, a);
		return s ? Wt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, rt(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ct(e, t, n, r) {
	let i = nt(e), a = i !== e && !/* @__PURE__ */ Vt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = rt(e, t)), n.call(this, t, rt(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? rt(e, c) : c;
}
function lt(e, t, n) {
	let r = /* @__PURE__ */ P(e);
	N(r, "iterate", $e);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ht(n[0]) ? (n[0] = /* @__PURE__ */ P(n[0]), r[t](...n)) : i;
}
function ut(e, t, n = []) {
	Ue(), Ne();
	let r = (/* @__PURE__ */ P(e))[t].apply(e, n);
	return Pe(), We(), r;
}
var dt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ft = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function pt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ P(this);
	return N(t, "has", e), t.hasOwnProperty(e);
}
var mt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Mt : jt : i ? At : kt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = it[t])) return e;
			if (t === "hasOwnProperty") return pt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ F(e) ? e : n);
		if ((_(t) ? ft.has(t) : dt(t)) || (r || N(e, "get", t), i)) return o;
		if (/* @__PURE__ */ F(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Lt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Lt(o) : /* @__PURE__ */ Ft(o) : o;
	}
}, ht = class extends mt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Bt(i);
			if (!/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (i = /* @__PURE__ */ P(i), n = /* @__PURE__ */ P(n)), !a && /* @__PURE__ */ F(i) && !/* @__PURE__ */ F(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ F(e) ? e : r);
		return e === /* @__PURE__ */ P(r) && (o ? D(n, i) && et(e, "set", t, n, i) : et(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && et(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !ft.has(t)) && N(e, "has", t), n;
	}
	ownKeys(e) {
		return N(e, "iterate", d(e) ? "length" : Ze), Reflect.ownKeys(e);
	}
}, gt = class extends mt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, _t = /* @__PURE__ */ new ht(), vt = /* @__PURE__ */ new gt(), yt = /* @__PURE__ */ new ht(!0), bt = (e) => e, xt = (e) => Reflect.getPrototypeOf(e);
function St(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ P(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? bt : t ? Gt : Wt;
		return !t && N(a, "iterate", l ? Qe : Ze), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Ct(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function wt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ P(r), a = /* @__PURE__ */ P(n);
			e || (D(n, a) && N(i, "get", n), N(i, "get", a));
			let { has: o } = xt(i), s = t ? bt : e ? Gt : Wt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && N(/* @__PURE__ */ P(t), "iterate", Ze), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ P(n), i = /* @__PURE__ */ P(t);
			return e || (D(t, i) && N(r, "has", t), N(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ P(a), s = t ? bt : e ? Gt : Wt;
			return !e && N(o, "iterate", Ze), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Ct("add"),
		set: Ct("set"),
		delete: Ct("delete"),
		clear: Ct("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ P(this), r = xt(n), i = /* @__PURE__ */ P(e), a = !t && !/* @__PURE__ */ Vt(e) && !/* @__PURE__ */ Bt(e) ? i : e;
			return r.has.call(n, a) || D(e, a) && r.has.call(n, e) || D(i, a) && r.has.call(n, i) || (n.add(a), et(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Vt(n) && !/* @__PURE__ */ Bt(n) && (n = /* @__PURE__ */ P(n));
			let r = /* @__PURE__ */ P(this), { has: i, get: a } = xt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ P(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? D(n, s) && et(r, "set", e, n, s) : et(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ P(this), { has: n, get: r } = xt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ P(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && et(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ P(this), t = e.size !== 0, n = e.clear();
			return t && et(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = St(r, e, t);
	}), n;
}
function Tt(e, t) {
	let n = wt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Et = { get: /* @__PURE__ */ Tt(!1, !1) }, Dt = { get: /* @__PURE__ */ Tt(!1, !0) }, Ot = { get: /* @__PURE__ */ Tt(!0, !1) }, kt = /* @__PURE__ */ new WeakMap(), At = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Mt = /* @__PURE__ */ new WeakMap();
function Nt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
function Pt(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Nt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return /* @__PURE__ */ Bt(e) ? e : Rt(e, !1, _t, Et, kt);
}
/* @__NO_SIDE_EFFECTS__ */
function It(e) {
	return Rt(e, !1, yt, Dt, At);
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return Rt(e, !0, vt, Ot, jt);
}
function Rt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Pt(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	return /* @__PURE__ */ Bt(e) ? /* @__PURE__ */ zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Bt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Vt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Ht(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function P(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ P(t) : e;
}
function Ut(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && O(e, "__v_skip", !0), e;
}
var Wt = (e) => v(e) ? /* @__PURE__ */ Ft(e) : e, Gt = (e) => v(e) ? /* @__PURE__ */ Lt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function F(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function Kt(e) {
	return qt(e, !1);
}
function qt(e, t) {
	return /* @__PURE__ */ F(e) ? e : new Jt(e, t);
}
var Jt = class {
	constructor(e, t) {
		this.dep = new Je(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ P(e), this._value = t ? e : Wt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Vt(e) || /* @__PURE__ */ Bt(e);
		e = n ? e : /* @__PURE__ */ P(e), D(e, t) && (this._rawValue = e, this._value = n ? e : Wt(e), this.dep.trigger());
	}
};
function I(e) {
	return /* @__PURE__ */ F(e) ? e.value : e;
}
var Yt = {
	get: (e, t, n) => t === "__v_raw" ? e : I(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ F(i) && !/* @__PURE__ */ F(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Xt(e) {
	return /* @__PURE__ */ zt(e) ? e : new Proxy(e, Yt);
}
var Zt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Je(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ke - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && M !== this) return Me(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Re(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Qt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Zt(r, i, n);
}
var $t = {}, en = /* @__PURE__ */ new WeakMap(), tn = void 0;
function nn(e, t = !1, n = tn) {
	if (n) {
		let t = en.get(n);
		t || en.set(n, t = []), t.push(e);
	}
}
function rn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Vt(e) || o === !1 || o === 0 ? an(e, 1) : an(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ F(e) ? (g = () => e.value, y = /* @__PURE__ */ Vt(e)) : /* @__PURE__ */ zt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ zt(e) || /* @__PURE__ */ Vt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ F(e)) return e.value;
		if (/* @__PURE__ */ zt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Ue();
			try {
				_();
			} finally {
				We();
			}
		}
		let t = tn;
		tn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			tn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => an(e(), t);
	}
	let x = Ee(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill($t) : $t, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => D(e, C[t])) : D(e, C))) {
				_ && _();
				let t = tn;
				tn = m;
				try {
					let t = [
						e,
						C === $t ? void 0 : b && C[0] === $t ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					tn = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Oe(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => nn(e, !1, m), _ = m.onStop = () => {
		let e = en.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			en.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function an(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ F(e)) an(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) an(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		an(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) an(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && an(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function on(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		cn(e, t, n);
	}
}
function sn(e, t, n, r) {
	if (h(e)) {
		let i = on(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			cn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(sn(e[a], t, n, r));
		return i;
	}
}
function cn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			Ue(), on(o, null, 10, [
				e,
				i,
				a
			]), We();
			return;
		}
	}
	ln(e, r, a, i, s);
}
function ln(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var L = [], un = -1, dn = [], fn = null, pn = 0, mn = /* @__PURE__ */ Promise.resolve(), hn = null;
function gn(e) {
	let t = hn || mn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function _n(e) {
	let t = un + 1, n = L.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = L[r], a = Cn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function vn(e) {
	if (!(e.flags & 1)) {
		let t = Cn(e), n = L[L.length - 1];
		!n || !(e.flags & 2) && t >= Cn(n) ? L.push(e) : L.splice(_n(t), 0, e), e.flags |= 1, yn();
	}
}
function yn() {
	hn ||= mn.then(wn);
}
function bn(e) {
	d(e) ? dn.push(...e) : fn && e.id === -1 ? fn.splice(pn + 1, 0, e) : e.flags & 1 || (dn.push(e), e.flags |= 1), yn();
}
function xn(e, t, n = un + 1) {
	for (; n < L.length; n++) {
		let t = L[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			L.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Sn(e) {
	if (dn.length) {
		let e = [...new Set(dn)].sort((e, t) => Cn(e) - Cn(t));
		if (dn.length = 0, fn) {
			fn.push(...e);
			return;
		}
		for (fn = e, pn = 0; pn < fn.length; pn++) {
			let e = fn[pn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		fn = null, pn = 0;
	}
}
var Cn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function wn(e) {
	try {
		for (un = 0; un < L.length; un++) {
			let e = L[un];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), on(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; un < L.length; un++) {
			let e = L[un];
			e && (e.flags &= -2);
		}
		un = -1, L.length = 0, Sn(e), hn = null, (L.length || dn.length) && wn(e);
	}
}
var R = null, Tn = null;
function En(e) {
	let t = R;
	return R = e, Tn = e && e.type.__scopeId || null, t;
}
function Dn(e, t = R, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && ra(-1);
		let i = En(t), a;
		try {
			a = e(...n);
		} finally {
			En(i), r._d && ra(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function On(e, n) {
	if (R === null) return e;
	let r = La(R), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && an(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function kn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Ue(), sn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), We());
	}
}
function An(e, t) {
	if (X) {
		let n = X.provides, r = X.parent && X.parent.provides;
		r === n && (n = X.provides = Object.create(r)), n[e] = t;
	}
}
function jn(e, t, n = !1) {
	let r = Sa();
	if (r || li) {
		let i = li ? li._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Mn = /* @__PURE__ */ Symbol.for("v-scx"), Nn = () => jn(Mn);
function Pn(e, t, n) {
	return Fn(e, t, n);
}
function Fn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (Oa) {
		if (c === "sync") {
			let e = Nn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = X;
	u.call = (e, t, n) => sn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		V(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : vn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = rn(e, n, u);
	return Oa && (f ? f.push(h) : d && h()), h;
}
function In(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Ln(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = Ta(this), s = Fn(i, a.bind(r), n);
	return o(), s;
}
function Ln(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Rn = /* @__PURE__ */ Symbol("_vte"), zn = (e) => e.__isTeleport, Bn = (e) => e && (e.disabled || e.disabled === ""), Vn = (e) => e && (e.defer || e.defer === ""), Hn = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Un = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Wn = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, Gn = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g } } = l, _ = Bn(t.props), { shapeFlag: v, children: y, dynamicChildren: b } = t;
		if (e == null) {
			let e = t.el = h(""), l = t.anchor = h("");
			p(e, n, r), p(l, n, r);
			let d = (e, t) => {
				v & 16 && u(y, e, t, i, a, o, s, c);
			}, f = () => {
				let e = t.target = Wn(t.props, m), n = Xn(e, t, h, p);
				e && (o !== "svg" && Hn(e) ? o = "svg" : o !== "mathml" && Un(e) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(e), _ || (d(e, n), Yn(t, !1)));
			};
			_ && (d(n, l), Yn(t, !0)), Vn(t.props) || a && a.pendingBranch ? (t.el.__isMounted = !1, V(() => {
				t.el.__isMounted === !1 && (f(), delete t.el.__isMounted);
			}, a)) : f();
		} else {
			t.el = e.el, t.targetStart = e.targetStart;
			let u = t.anchor = e.anchor, p = t.target = e.target, h = t.targetAnchor = e.targetAnchor;
			if (e.el.__isMounted === !1) {
				V(() => {
					Gn.process(e, t, n, r, i, a, o, s, c, l);
				}, a);
				return;
			}
			let g = Bn(e.props), v = g ? n : p, y = g ? u : h;
			if (o === "svg" || Hn(p) ? o = "svg" : (o === "mathml" || Un(p)) && (o = "mathml"), b ? (f(e.dynamicChildren, b, v, i, a, o, s), Gi(e, t, !0)) : c || d(e, t, v, y, i, a, o, s, !1), _) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Kn(t, n, u, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = t.target = Wn(t.props, m);
				e && Kn(t, e, null, l, 0);
			} else g && Kn(t, p, h, l, 1);
			Yn(t, _);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e;
		if (d && (i(l), i(u)), a && i(c), o & 16) {
			let e = a || !Bn(f);
			for (let i = 0; i < s.length; i++) {
				let a = s[i];
				r(a, t, n, e, !!a.dynamicChildren);
			}
		}
	},
	move: Kn,
	hydrate: qn
};
function Kn(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), (!d || Bn(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function qn(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = Wn(t.props, c), h = Bn(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Xn(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Xn(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Yn(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var Jn = Gn;
function Yn(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function Xn(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[Rn] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Zn = /* @__PURE__ */ Symbol("_leaveCb"), Qn = /* @__PURE__ */ Symbol("_enterCb");
function $n() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Dr(() => {
		e.isMounted = !0;
	}), Ar(() => {
		e.isUnmounting = !0;
	}), e;
}
var er = [Function, Array], tr = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: er,
	onEnter: er,
	onAfterEnter: er,
	onEnterCancelled: er,
	onBeforeLeave: er,
	onLeave: er,
	onAfterLeave: er,
	onLeaveCancelled: er,
	onBeforeAppear: er,
	onAppear: er,
	onAfterAppear: er,
	onAppearCancelled: er
}, nr = (e) => {
	let t = e.subTree;
	return t.component ? nr(t.component) : t;
}, rr = {
	name: "BaseTransition",
	props: tr,
	setup(e, { slots: t }) {
		let n = Sa(), r = $n();
		return () => {
			let i = t.default && dr(t.default(), !0);
			if (!i || !i.length) return;
			let a = ir(i), o = /* @__PURE__ */ P(e), { mode: s } = o;
			if (r.isLeaving) return cr(a);
			let c = lr(a);
			if (!c) return cr(a);
			let l = sr(c, o, r, n, (e) => l = e);
			c.type !== U && ur(c, l);
			let u = n.subTree && lr(n.subTree);
			if (u && u.type !== U && !sa(u, c) && nr(n).type !== U) {
				let e = sr(u, o, r, n);
				if (ur(u, e), s === "out-in" && c.type !== U) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, cr(a);
				s === "in-out" && c.type !== U ? e.delayLeave = (e, t, n) => {
					let i = or(r, u);
					i[String(u.key)] = u, e[Zn] = () => {
						t(), e[Zn] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function ir(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== U) {
			t = n;
			break;
		}
	}
	return t;
}
var ar = rr;
function or(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function sr(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = or(n, e), C = (e, t) => {
		e && sn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, ee = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Zn] && t[Zn](!0);
			let i = S[x];
			i && sa(e, i) && i.el[Zn] && i.el[Zn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[Qn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), ee.delayedLeave && ee.delayedLeave(), t[Qn] = void 0);
			};
			let c = t[Qn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Qn] && t[Qn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Zn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Zn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Zn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = sr(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return ee;
}
function cr(e) {
	if (yr(e)) return e = fa(e), e.children = null, e;
}
function lr(e) {
	if (!yr(e)) return zn(e.type) && e.children ? ir(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function ur(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ur(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function dr(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === H ? (o.patchFlag & 128 && i++, r = r.concat(dr(o.children, t, s))) : (t || o.type !== U) && r.push(s == null ? o : fa(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function fr(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function pr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function mr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var hr = /* @__PURE__ */ new WeakMap();
function gr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => gr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (vr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && gr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? La(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ P(v), b = v === t ? i : (e) => mr(_, e) ? !1 : u(y, e), x = (e, t) => !(t && mr(_, t));
	if (m != null && m !== p) {
		if (_r(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ F(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) on(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ F(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), hr.delete(e);
				};
				t.id = -1, hr.set(e, t), V(t, r);
			} else _r(e), i();
		}
	}
}
function _r(e) {
	let t = hr.get(e);
	t && (t.flags |= 8, hr.delete(e));
}
ue().requestIdleCallback, ue().cancelIdleCallback;
var vr = (e) => !!e.type.__asyncLoader, yr = (e) => e.type.__isKeepAlive;
function br(e, t) {
	Sr(e, "a", t);
}
function xr(e, t) {
	Sr(e, "da", t);
}
function Sr(e, t, n = X) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (wr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) yr(e.parent.vnode) && Cr(r, t, n, e), e = e.parent;
	}
}
function Cr(e, t, n, r) {
	let i = wr(t, e, r, !0);
	jr(() => {
		c(r[t], i);
	}, n);
}
function wr(e, t, n = X, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Ue();
			let i = Ta(n), a = sn(t, n, e, r);
			return i(), We(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Tr = (e) => (t, n = X) => {
	(!Oa || e === "sp") && wr(e, (...e) => t(...e), n);
}, Er = Tr("bm"), Dr = Tr("m"), Or = Tr("bu"), kr = Tr("u"), Ar = Tr("bum"), jr = Tr("um"), Mr = Tr("sp"), Nr = Tr("rtg"), Pr = Tr("rtc");
function Fr(e, t = X) {
	wr("ec", e, t);
}
var Ir = "components", Lr = /* @__PURE__ */ Symbol.for("v-ndc");
function Rr(e) {
	return g(e) ? zr(Ir, e, !1) || e : e || Lr;
}
function zr(e, t, n = !0, r = !1) {
	let i = R || X;
	if (i) {
		let n = i.type;
		if (e === Ir) {
			let e = Ra(n, !1);
			if (e && (e === t || e === T(t) || e === ie(T(t)))) return n;
		}
		let a = Br(i[e] || n[e], t) || Br(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function Br(e, t) {
	return e && (e[t] || e[T(t)] || e[ie(T(t))]);
}
function z(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ zt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Vt(e), s = /* @__PURE__ */ Bt(e), e = nt(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Gt(Wt(e[n])) : Wt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var Vr = (e) => e ? Da(e) ? La(e) : Vr(e.parent) : null, Hr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Vr(e.parent),
	$root: (e) => Vr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Zr(e),
	$forceUpdate: (e) => e.f ||= () => {
		vn(e.update);
	},
	$nextTick: (e) => e.n ||= gn.bind(e.proxy),
	$watch: (e) => In.bind(e)
}), Ur = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Wr = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Ur(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Kr && (s[n] = 0);
		}
		let d = Hr[n], f, p;
		if (d) return n === "$attrs" && N(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Ur(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Ur(n, c) || u(o, c) || u(i, c) || u(Hr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Gr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Kr = !0;
function qr(e) {
	let t = Zr(e), n = e.proxy, i = e.ctx;
	Kr = !1, t.beforeCreate && Yr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: re, expose: E, inheritAttrs: ie, components: ae, directives: D, filters: oe } = t;
	if (u && Jr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Ft(t));
	}
	if (Kr = !0, o) for (let e in o) {
		let t = o[e], a = Z({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Xr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			An(t, e[t]);
		});
	}
	f && Yr(f, e, "c");
	function O(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (O(Er, p), O(Dr, m), O(Or, g), O(kr, _), O(br, y), O(xr, b), O(Fr, T), O(Pr, te), O(Nr, ne), O(Ar, S), O(jr, w), O(Mr, re), d(E)) if (E.length) {
		let t = e.exposed ||= {};
		E.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === r && (e.render = ee), ie != null && (e.inheritAttrs = ie), ae && (e.components = ae), D && (e.directives = D), re && pr(e);
}
function Jr(e, t, n = r) {
	d(e) && (e = ni(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? jn(r.from || n, r.default, !0) : jn(r.from || n) : jn(r), /* @__PURE__ */ F(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Yr(e, t, n) {
	sn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Xr(e, t, n, r) {
	let i = r.includes(".") ? Ln(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Pn(i, n);
	} else if (h(e)) Pn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Xr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Pn(i, r, e);
	}
}
function Zr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Qr(c, e, o, !0)), Qr(c, t, o)), v(t) && a.set(t, c), c;
}
function Qr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Qr(e, a, n, !0), i && i.forEach((t) => Qr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = $r[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var $r = {
	data: ei,
	props: ii,
	emits: ii,
	methods: ri,
	computed: ri,
	beforeCreate: B,
	created: B,
	beforeMount: B,
	mounted: B,
	beforeUpdate: B,
	updated: B,
	beforeDestroy: B,
	beforeUnmount: B,
	destroyed: B,
	unmounted: B,
	activated: B,
	deactivated: B,
	errorCaptured: B,
	serverPrefetch: B,
	components: ri,
	directives: ri,
	watch: ai,
	provide: ei,
	inject: ti
};
function ei(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function ti(e, t) {
	return ri(ni(e), ni(t));
}
function ni(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function B(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function ri(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ii(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Gr(e), Gr(t ?? {})) : t;
}
function ai(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = B(e[r], t[r]);
	return n;
}
function oi() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var si = 0;
function ci(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = oi(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: si++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Va,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || J(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, La(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (sn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = li;
				li = l;
				try {
					return e();
				} finally {
					li = t;
				}
			}
		};
		return l;
	};
}
var li = null, ui = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${E(t)}Modifiers`];
function di(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && ui(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(se)));
	let c, l = i[c = ae(n)] || i[c = ae(T(n))];
	!l && o && (l = i[c = ae(E(n))]), l && sn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, sn(u, e, 6, a);
	}
}
var fi = /* @__PURE__ */ new WeakMap();
function pi(e, t, n = !1) {
	let r = n ? fi : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = pi(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function mi(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, E(t)) || u(e, t));
}
function hi(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = En(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ma(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = ma(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : gi(c);
		}
	} catch (t) {
		ea.length = 0, cn(t, e, 1), v = J(U);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = _i(y, a)), b = fa(b, y, !1, !0));
	}
	return n.dirs && (b = fa(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ur(b, n.transition), v = b, En(_), v;
}
var gi = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, _i = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function vi(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? yi(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (bi(o, r, n) && !mi(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? yi(r, o, l) : !0 : !!o;
	return !1;
}
function yi(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (bi(t, e, a) && !mi(n, a)) return !0;
	}
	return !1;
}
function bi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !be(r, i) : r !== i;
}
function xi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Si = {}, Ci = () => Object.create(Si), wi = (e) => Object.getPrototypeOf(e) === Si;
function Ti(e, t, n, r = !1) {
	let i = {}, a = Ci();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Di(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ It(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Ei(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ P(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (mi(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = Oi(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		Di(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = E(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Oi(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && et(e.attrs, "set", "");
}
function Di(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : mi(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ P(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = Oi(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function Oi(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Ta(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === E(n)) && (r = !0));
	}
	return r;
}
var ki = /* @__PURE__ */ new WeakMap();
function Ai(e, r, i = !1) {
	let a = i ? ki : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = Ai(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		ji(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (ji(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				} else n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function ji(e) {
	return e[0] !== "$" && !ee(e);
}
var Mi = (e) => e === "_" || e === "_ctx" || e === "$stable", Ni = (e) => d(e) ? e.map(ma) : [ma(e)], Pi = (e, t, n) => {
	if (t._n) return t;
	let r = Dn((...e) => Ni(t(...e)), n);
	return r._c = !1, r;
}, Fi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Mi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = Pi(n, i, r);
		else if (i != null) {
			let e = Ni(i);
			t[n] = () => e;
		}
	}
}, Ii = (e, t) => {
	let n = Ni(t);
	e.slots.default = () => n;
}, Li = (e, t, n) => {
	for (let r in t) (n || !Mi(r)) && (e[r] = t[r]);
}, Ri = (e, t, n) => {
	let r = e.slots = Ci();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Li(r, t, n), n && O(r, "_", e, !0)) : Fi(t, r);
	} else t && Ii(e, t);
}, zi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : Li(a, n, r) : (o = !n.$stable, Fi(n, a)), s = n;
	} else n && (Ii(e, n), s = { default: 1 });
	if (o) for (let e in a) !Mi(e) && s[e] == null && delete a[e];
}, V = Zi;
function Bi(e) {
	return Vi(e);
}
function Vi(e, i) {
	let a = ue();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !sa(e, t) && (r = ye(e), he(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Qi:
				y(e, t, n, r);
				break;
			case U:
				b(e, t, n, r);
				break;
			case $i:
				e ?? x(t, n, r, o);
				break;
			case H:
				ae(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? D(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Se);
		}
		u != null && i ? gr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && gr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Hi(e, a), s, u), _ && kn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && va(f, r, e);
		}
		_ && kn(e, null, r, "beforeMount");
		let v = Wi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && V(() => {
			try {
				f && va(f, r, e), v && g.enter(d), _ && kn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Xi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ha(e[l]) : ma(e[l]), t, n, r, i, a, o, s);
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ui(r, !1), (g = h.onVnodeBeforeUpdate) && va(g, r, n, e), f && kn(n, e, r, "beforeUpdate"), r && Ui(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? E(e.dynamicChildren, d, l, r, i, Hi(n, a), o) : s || de(e, n, l, null, r, i, Hi(n, a), o, !1), u > 0) {
			if (u & 16) ie(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ie(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && V(() => {
			g && va(g, r, n, e), f && kn(n, e, r, "updated");
		}, i);
	}, E = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === H || !sa(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ie = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ae = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (E(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Gi(e, t, !0)) : de(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : O(t, n, r, i, a, o, c) : se(e, t, c);
	}, O = (e, t, n, r, i, a, o) => {
		let s = e.component = xa(e, r, i);
		if (yr(e) && (s.ctx.renderer = Se), ka(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = J(U);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, se = (e, t, n) => {
		let r = t.component = e.component;
		if (vi(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = qi(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							V(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ui(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && va(d, s, t, c), Ui(e, !0);
				let f = hi(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ye(p), e, i, a), t.el = f.el, u === null && xi(e, f.el), r && V(r, i), (d = t.props && t.props.onVnodeUpdated) && V(() => va(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = vr(t);
				if (Ui(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && va(o, d, t), Ui(e, !0), s && Ce) {
					let t = () => {
						e.subTree = hi(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = hi(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && V(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					V(() => va(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && vr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && V(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Oe(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => vn(u), Ui(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, Ei(e, t.props, r, n), zi(e, t.children, n), Ue(), xn(e), We();
	}, de = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				pe(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				fe(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && ve(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? pe(l, d, n, r, i, a, o, s, c) : ve(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, fe = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? ha(t[p]) : ma(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? ve(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, pe = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ha(t[u]) : ma(t[u]);
			if (sa(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ha(t[p]) : ma(t[p]);
			if (sa(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ha(t[u]) : ma(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) he(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ha(t[u]) : ma(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					he(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && sa(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? he(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ki(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Yi(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? me(n, r, p, 2) : _--);
			}
		}
	}, me = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			me(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Se);
			return;
		}
		if (c === H) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === $i) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), V(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Zn](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, he = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (Ue(), gr(s, null, n, e, !0), We()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !vr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && va(_, t, e), u & 6) _e(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && kn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Se, r) : l && !l.hasOnce && (a !== H || d > 0 && d & 64) ? ve(l, t, n, !1, !0) : (a === H && d & 384 || !i && u & 16) && ve(c, t, n), r && k(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && V(() => {
			_ && va(_, t, e), h && kn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, k = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === H) {
			ge(n, r);
			return;
		}
		if (t === $i) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, ge = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, _e = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ji(c), Ji(l), r && oe(r), i.stop(), a && (a.flags |= 8, he(o, e, t, n)), s && V(s, t), V(() => {
			e.isUnmounted = !0;
		}, t);
	}, ve = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) he(e[o], t, n, r, i);
	}, ye = (e) => {
		if (e.shapeFlag & 6) return ye(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Rn];
		return n ? h(n) : t;
	}, be = !1, xe = (e, t, n) => {
		let r;
		e == null ? t._vnode && (he(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, be ||= (be = !0, xn(r), Sn(), !1);
	}, Se = {
		p: v,
		um: he,
		m: me,
		r: k,
		mt: O,
		mc: T,
		pc: de,
		pbc: E,
		n: ye,
		o: e
	}, A, Ce;
	return i && ([A, Ce] = i(Se)), {
		render: xe,
		hydrate: A,
		createApp: ci(xe, A)
	};
}
function Hi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ui({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Wi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Gi(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ha(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Gi(t, a)), a.type === Qi && (a.patchFlag === -1 && (a = i[e] = ha(a)), a.el = t.el), a.type === U && !a.el && (a.el = t.el);
	}
}
function Ki(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function qi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : qi(t);
}
function Ji(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Yi(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Yi(t.subTree) : null;
}
var Xi = (e) => e.__isSuspense;
function Zi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : bn(e);
}
var H = /* @__PURE__ */ Symbol.for("v-fgt"), Qi = /* @__PURE__ */ Symbol.for("v-txt"), U = /* @__PURE__ */ Symbol.for("v-cmt"), $i = /* @__PURE__ */ Symbol.for("v-stc"), ea = [], W = null;
function G(e = !1) {
	ea.push(W = e ? null : []);
}
function ta() {
	ea.pop(), W = ea[ea.length - 1] || null;
}
var na = 1;
function ra(e, t = !1) {
	na += e, e < 0 && W && t && (W.hasOnce = !0);
}
function ia(e) {
	return e.dynamicChildren = na > 0 ? W || n : null, ta(), na > 0 && W && W.push(e), e;
}
function K(e, t, n, r, i, a) {
	return ia(q(e, t, n, r, i, a, !0));
}
function aa(e, t, n, r, i) {
	return ia(J(e, t, n, r, i, !0));
}
function oa(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function sa(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ca = ({ key: e }) => e ?? null, la = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ F(e) || h(e) ? {
	i: R,
	r: e,
	k: t,
	f: !!n
} : e);
function q(e, t = null, n = null, r = 0, i = null, a = e === H ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && ca(t),
		ref: t && la(t),
		scopeId: Tn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: R
	};
	return s ? (ga(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), na > 0 && !o && W && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && W.push(c), c;
}
var J = ua;
function ua(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Lr) && (e = U), oa(e)) {
		let r = fa(e, t, !0);
		return n && ga(r, n), na > 0 && !a && W && (r.shapeFlag & 6 ? W[W.indexOf(e)] = r : W.push(r)), r.patchFlag = -2, r;
	}
	if (za(e) && (e = e.__vccOpts), t) {
		t = da(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = k(e)), v(n) && (/* @__PURE__ */ Ht(n) && !d(n) && (n = s({}, n)), t.style = de(n));
	}
	let o = g(e) ? 1 : Xi(e) ? 128 : zn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return q(e, t, n, r, i, o, a, !0);
}
function da(e) {
	return e ? /* @__PURE__ */ Ht(e) || wi(e) ? s({}, e) : e : null;
}
function fa(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? _a(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ca(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(la(t)) : [a, la(t)] : la(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== H ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && fa(e.ssContent),
		ssFallback: e.ssFallback && fa(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ur(u, c.clone(u)), u;
}
function pa(e = " ", t = 0) {
	return J(Qi, null, e, t);
}
function Y(e = "", t = !1) {
	return t ? (G(), aa(U, null, e)) : J(U, null, e);
}
function ma(e) {
	return e == null || typeof e == "boolean" ? J(U) : d(e) ? J(H, null, e.slice()) : oa(e) ? ha(e) : J(Qi, null, String(e));
}
function ha(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : fa(e);
}
function ga(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ga(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !wi(t) ? t._ctx = R : r === 3 && R && (R.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: R
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [pa(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function _a(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = k([t.class, r.class]));
		else if (e === "style") t.style = de([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function va(e, t, n, r = null) {
	sn(e, t, 7, [n, r]);
}
var ya = oi(), ba = 0;
function xa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ya, o = {
		uid: ba++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Te(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: Ai(i, a),
		emitsOptions: pi(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = di.bind(null, o), e.ce && e.ce(o), o;
}
var X = null, Sa = () => X || R, Ca, wa;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Ca = t("__VUE_INSTANCE_SETTERS__", (e) => X = e), wa = t("__VUE_SSR_SETTERS__", (e) => Oa = e);
}
var Ta = (e) => {
	let t = X;
	return Ca(e), e.scope.on(), () => {
		e.scope.off(), Ca(t);
	};
}, Ea = () => {
	X && X.scope.off(), Ca(null);
};
function Da(e) {
	return e.vnode.shapeFlag & 4;
}
var Oa = !1;
function ka(e, t = !1, n = !1) {
	t && wa(t);
	let { props: r, children: i } = e.vnode, a = Da(e);
	Ti(e, r, a, t), Ri(e, i, n || t);
	let o = a ? Aa(e, t) : void 0;
	return t && wa(!1), o;
}
function Aa(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Wr);
	let { setup: r } = n;
	if (r) {
		Ue();
		let n = e.setupContext = r.length > 1 ? Ia(e) : null, i = Ta(e), a = on(r, e, 0, [e.props, n]), o = y(a);
		if (We(), i(), (o || e.sp) && !vr(e) && pr(e), o) {
			if (a.then(Ea, Ea), t) return a.then((n) => {
				ja(e, n, t);
			}).catch((t) => {
				cn(t, e, 0);
			});
			e.asyncDep = a;
		} else ja(e, a, t);
	} else Pa(e, t);
}
function ja(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Xt(t)), Pa(e, n);
}
var Ma, Na;
function Pa(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && Ma && !i.render) {
			let t = i.template || Zr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = Ma(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, Na && Na(e);
	}
	{
		let t = Ta(e);
		Ue();
		try {
			qr(e);
		} finally {
			We(), t();
		}
	}
}
var Fa = { get(e, t) {
	return N(e, "get", ""), e[t];
} };
function Ia(e) {
	return {
		attrs: new Proxy(e.attrs, Fa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function La(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Xt(Ut(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Hr) return Hr[n](e);
		},
		has(e, t) {
			return t in e || t in Hr;
		}
	}) : e.proxy;
}
function Ra(e, t = !0) {
	return h(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function za(e) {
	return h(e) && "__vccOpts" in e;
}
var Z = (e, t) => /* @__PURE__ */ Qt(e, t, Oa);
function Ba(e, t, n) {
	try {
		ra(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? oa(t) ? J(e, null, [t]) : J(e, t) : J(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && oa(n) && (n = [n]), J(e, t, n));
	} finally {
		ra(1);
	}
}
var Va = "3.5.31", Ha = void 0, Ua = typeof window < "u" && window.trustedTypes;
if (Ua) try {
	Ha = /* @__PURE__ */ Ua.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Wa = Ha ? (e) => Ha.createHTML(e) : (e) => e, Ga = "http://www.w3.org/2000/svg", Ka = "http://www.w3.org/1998/Math/MathML", qa = typeof document < "u" ? document : null, Ja = qa && /* @__PURE__ */ qa.createElement("template"), Ya = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? qa.createElementNS(Ga, e) : t === "mathml" ? qa.createElementNS(Ka, e) : n ? qa.createElement(e, { is: n }) : qa.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => qa.createTextNode(e),
	createComment: (e) => qa.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => qa.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ja.innerHTML = Wa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ja.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Xa = "transition", Za = "animation", Qa = /* @__PURE__ */ Symbol("_vtc"), $a = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, eo = /* @__PURE__ */ s({}, tr, $a), to = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = eo, e))((e, { slots: t }) => Ba(ar, io(e), t)), no = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, ro = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function io(e) {
	let t = {};
	for (let n in e) n in $a || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = ao(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: ee = b } = t, te = (e, t, n, r) => {
		e._enterCancelled = r, co(e, t ? d : c), co(e, t ? u : o), n && n();
	}, ne = (e, t) => {
		e._isLeaving = !1, co(e, f), co(e, m), co(e, p), t && t();
	}, T = (e) => (t, n) => {
		let i = e ? w : y, o = () => te(t, e, n);
		no(i, [t, o]), lo(() => {
			co(t, e ? l : a), so(t, e ? d : c), ro(i) || fo(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			no(v, [e]), so(e, a), so(e, o);
		},
		onBeforeAppear(e) {
			no(C, [e]), so(e, l), so(e, u);
		},
		onEnter: T(!1),
		onAppear: T(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ne(e, t);
			so(e, f), e._enterCancelled ? (so(e, p), go(e)) : (go(e), so(e, p)), lo(() => {
				e._isLeaving && (co(e, f), so(e, m), ro(x) || fo(e, r, _, n));
			}), no(x, [e, n]);
		},
		onEnterCancelled(e) {
			te(e, !1, void 0, !0), no(b, [e]);
		},
		onAppearCancelled(e) {
			te(e, !0, void 0, !0), no(ee, [e]);
		},
		onLeaveCancelled(e) {
			ne(e), no(S, [e]);
		}
	});
}
function ao(e) {
	if (e == null) return null;
	if (v(e)) return [oo(e.enter), oo(e.leave)];
	{
		let t = oo(e);
		return [t, t];
	}
}
function oo(e) {
	return ce(e);
}
function so(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Qa] || (e[Qa] = /* @__PURE__ */ new Set())).add(t);
}
function co(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Qa];
	n && (n.delete(t), n.size || (e[Qa] = void 0));
}
function lo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var uo = 0;
function fo(e, t, n, r) {
	let i = e._endId = ++uo, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = po(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function po(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Xa}Delay`), a = r(`${Xa}Duration`), o = mo(i, a), s = r(`${Za}Delay`), c = r(`${Za}Duration`), l = mo(s, c), u = null, d = 0, f = 0;
	t === Xa ? o > 0 && (u = Xa, d = o, f = a.length) : t === Za ? l > 0 && (u = Za, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Xa : Za : null, f = u ? u === Xa ? a.length : c.length : 0);
	let p = u === Xa && /\b(?:transform|all)(?:,|$)/.test(r(`${Xa}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function mo(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => ho(t) + ho(e[n])));
}
function ho(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function go(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function _o(e, t, n) {
	let r = e[Qa];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var vo = /* @__PURE__ */ Symbol("_vod"), yo = /* @__PURE__ */ Symbol("_vsh"), bo = /* @__PURE__ */ Symbol(""), xo = /(?:^|;)\s*display\s*:/;
function So(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? wo(r, t, "");
		}
		else for (let e in t) n[e] ?? wo(r, e, "");
		for (let e in n) e === "display" && (a = !0), wo(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[bo];
			e && (n += ";" + e), r.cssText = n, a = xo.test(n);
		}
	} else t && e.removeAttribute("style");
	vo in e && (e[vo] = a ? r.display : "", e[yo] && (r.display = "none"));
}
var Co = /\s*!important$/;
function wo(e, t, n) {
	if (d(n)) n.forEach((n) => wo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = Do(e, t);
		Co.test(n) ? e.setProperty(E(r), n.replace(Co, ""), "important") : e[r] = n;
	}
}
var To = [
	"Webkit",
	"Moz",
	"ms"
], Eo = {};
function Do(e, t) {
	let n = Eo[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return Eo[t] = r;
	r = ie(r);
	for (let n = 0; n < To.length; n++) {
		let i = To[n] + r;
		if (i in e) return Eo[t] = i;
	}
	return t;
}
var Oo = "http://www.w3.org/1999/xlink";
function ko(e, t, n, r, i, a = _e(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Oo, t.slice(6, t.length)) : e.setAttributeNS(Oo, t, n) : n == null || a && !ve(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function Ao(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Wa(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = ve(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function jo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Mo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var No = /* @__PURE__ */ Symbol("_vei");
function Po(e, t, n, r, i = null) {
	let a = e[No] || (e[No] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Io(t);
		r ? jo(e, n, a[t] = Bo(r, i), s) : o && (Mo(e, n, o, s), a[t] = void 0);
	}
}
var Fo = /(?:Once|Passive|Capture)$/;
function Io(e) {
	let t;
	if (Fo.test(e)) {
		t = {};
		let n;
		for (; n = e.match(Fo);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : E(e.slice(2)), t];
}
var Lo = 0, Ro = /* @__PURE__ */ Promise.resolve(), zo = () => Lo ||= (Ro.then(() => Lo = 0), Date.now());
function Bo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		sn(Vo(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = zo(), n;
}
function Vo(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var Ho = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Uo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? _o(e, r, c) : t === "style" ? So(e, n, r) : a(t) ? o(t) || Po(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wo(e, t, r, c)) ? (Ao(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ko(e, t, r, c, s, t !== "value")) : e._isVueCE && (Go(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? Ao(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ko(e, t, r, c));
};
function Wo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ho(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ho(t) && g(n) ? !1 : t in e;
}
function Go(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var Ko = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ Symbol("_moveCb"), Yo = /* @__PURE__ */ Symbol("_enterCb"), Xo = /* @__PURE__ */ ((e) => (delete e.props.mode, e))({
	name: "TransitionGroup",
	props: /* @__PURE__ */ s({}, eo, {
		tag: String,
		moveClass: String
	}),
	setup(e, { slots: t }) {
		let n = Sa(), r = $n(), i, a;
		return kr(() => {
			if (!i.length) return;
			let t = e.moveClass || `${e.name || "v"}-move`;
			if (!ts(i[0].el, n.vnode.el, t)) {
				i = [];
				return;
			}
			i.forEach(Zo), i.forEach(Qo);
			let r = i.filter($o);
			go(n.vnode.el), r.forEach((e) => {
				let n = e.el, r = n.style;
				so(n, t), r.transform = r.webkitTransform = r.transitionDuration = "";
				let i = n[Jo] = (e) => {
					e && e.target !== n || (!e || e.propertyName.endsWith("transform")) && (n.removeEventListener("transitionend", i), n[Jo] = null, co(n, t));
				};
				n.addEventListener("transitionend", i);
			}), i = [];
		}), () => {
			let o = /* @__PURE__ */ P(e), s = io(o), c = o.tag || H;
			if (i = [], a) for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.el && t.el instanceof Element && (i.push(t), ur(t, sr(t, s, r, n)), Ko.set(t, es(t.el)));
			}
			a = t.default ? dr(t.default()) : [];
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t.key != null && ur(t, sr(t, s, r, n));
			}
			return J(c, null, a);
		};
	}
});
function Zo(e) {
	let t = e.el;
	t[Jo] && t[Jo](), t[Yo] && t[Yo]();
}
function Qo(e) {
	qo.set(e, es(e.el));
}
function $o(e) {
	let t = Ko.get(e), n = qo.get(e), r = t.left - n.left, i = t.top - n.top;
	if (r || i) {
		let t = e.el, n = t.style, a = t.getBoundingClientRect(), o = 1, s = 1;
		return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), n.transform = n.webkitTransform = `translate(${r / o}px,${i / s}px)`, n.transitionDuration = "0s", e;
	}
}
function es(e) {
	let t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	};
}
function ts(e, t, n) {
	let r = e.cloneNode(), i = e[Qa];
	i && i.forEach((e) => {
		e.split(/\s+/).forEach((e) => e && r.classList.remove(e));
	}), n.split(/\s+/).forEach((e) => e && r.classList.add(e)), r.style.display = "none";
	let a = t.nodeType === 1 ? t : t.parentNode;
	a.appendChild(r);
	let { hasTransform: o } = po(r);
	return a.removeChild(r), o;
}
var ns = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
};
function rs(e) {
	e.target.composing = !0;
}
function is(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var as = /* @__PURE__ */ Symbol("_assign");
function os(e, t, n) {
	return t && (e = e.trim()), n && (e = se(e)), e;
}
var ss = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[as] = ns(i);
		let a = r || i.props && i.props.type === "number";
		jo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[as](os(e.value, n, a));
		}), (n || a) && jo(e, "change", () => {
			e.value = os(e.value, n, a);
		}), t || (jo(e, "compositionstart", rs), jo(e, "compositionend", is), jo(e, "change", is));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[as] = ns(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? se(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, cs = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		jo(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(us(e)) : us(e));
			e[as](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, gn(() => {
				e._assigning = !1;
			});
		}), e[as] = ns(r);
	},
	mounted(e, { value: t }) {
		ls(e, t);
	},
	beforeUpdate(e, t, n) {
		e[as] = ns(n);
	},
	updated(e, { value: t }) {
		e._assigning || ls(e, t);
	}
};
function ls(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = us(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = xe(t, o) > -1;
			} else a.selected = t.has(o);
			else if (be(us(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function us(e) {
	return "_value" in e ? e._value : e.value;
}
var ds = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], fs = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => ds.some((n) => e[`${n}Key`] && !t.includes(n))
}, ps = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = fs[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, ms = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, hs = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = E(n.key);
		if (t.some((e) => e === r || ms[e] === r)) return e(n);
	}));
}, gs = /* @__PURE__ */ s({ patchProp: Uo }, Ya), _s;
function vs() {
	return _s ||= Bi(gs);
}
var ys = ((...e) => {
	let t = vs().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = xs(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, bs(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function bs(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function xs(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/app/context.ts
var Ss = Symbol("creator-app");
function Cs() {
	let e = jn(Ss);
	if (!e) throw Error("Creator app context is unavailable.");
	return e;
}
//#endregion
//#region src/shell/bubble/FloatingBubble.vue?vue&type=script&setup=true&lang.ts
var ws = ["onClick"], Ts = { class: "feed-text" }, Es = { class: "feed-title-row" }, Ds = { class: "feed-title" }, Os = {
	key: 0,
	class: "feed-repeat"
}, ks = {
	key: 0,
	class: "feed-message"
}, As = {
	key: 1,
	class: "feed-chips"
}, js = {
	key: 0,
	class: "bubble-badge"
}, Ms = 48, Q = 12, Ns = 12, Ps = 360, Fs = /* @__PURE__ */ fr({
	__name: "FloatingBubble",
	setup(e) {
		let { bubbleBus: t, layout: n, settings: r, shell: i } = Cs(), a = () => {
			let e = n.state.safeFrame;
			return {
				x: Math.max(e.left + Q, e.right - Ms - Q),
				y: Math.max(e.top + Q, e.bottom - Ms - Q)
			};
		}, o = r.state.bubblePosition ?? a(), s = /* @__PURE__ */ Kt(o.x), c = /* @__PURE__ */ Kt(o.y), l = /* @__PURE__ */ Kt(!1), u = Z(() => t.state.unreadCount), d = 0, f = 0, p = 0, m = 0, h = () => {
			let e = n.state.safeFrame, t = e.left + Q, r = Math.max(t, e.right - Ms - Q), i = e.top + Q, a = Math.max(i, e.bottom - Ms - Q);
			s.value = Math.max(t, Math.min(s.value, r)), c.value = Math.max(i, Math.min(c.value, a));
		}, g = () => {
			r.setBubblePosition({
				x: s.value,
				y: c.value
			});
		};
		Pn(() => [
			n.state.safeFrame.left,
			n.state.safeFrame.top,
			n.state.safeFrame.right,
			n.state.safeFrame.bottom
		], () => {
			if (!r.state.bubblePosition) {
				let e = a();
				s.value = e.x, c.value = e.y;
				return;
			}
			h();
		}, { immediate: !0 });
		let _ = (e) => {
			e && i.openPanel(e);
		}, v = Z(() => {
			let e = n.state.viewportFrame, t = n.state.safeFrame, r = Math.min(Ps, Math.max(0, t.width - Q * 2)), i = t.left + Q, a = Math.max(i, t.right - r - Q), o = Math.min(Math.max(s.value - r + Ms - 6, i), a), l = Math.max(c.value - Ns - (t.top + Q), 0), u = Math.max(t.bottom - (c.value + Ms + Ns + Q), 0), d = l >= 140 || l >= u;
			return r <= 0 ? {
				className: "below",
				style: { display: "none" }
			} : {
				className: d ? "above" : "below",
				style: d ? {
					left: `${o}px`,
					bottom: `${Math.max(0, e.bottom - c.value + Ns)}px`,
					maxWidth: `${r}px`,
					maxHeight: `${l}px`
				} : {
					left: `${o}px`,
					top: `${c.value + Ms + Ns}px`,
					maxWidth: `${r}px`,
					maxHeight: `${u}px`
				}
			};
		}), y = (e) => {
			l.value = !0, d = e.clientX, f = e.clientY, p = s.value, m = c.value, e.currentTarget.setPointerCapture(e.pointerId);
		}, b = (e) => {
			l.value && (s.value = p + (e.clientX - d), c.value = m + (e.clientY - f), h());
		}, x = (e) => {
			l.value && (l.value = !1, e.currentTarget.releasePointerCapture(e.pointerId), g(), Math.abs(e.clientX - d) < 5 && Math.abs(e.clientY - f) < 5 && i.togglePanel());
		};
		return (e, n) => (G(), K("div", {
			class: "floating-bubble-container",
			style: de({
				left: `${s.value}px`,
				top: `${c.value}px`
			})
		}, [q("div", {
			class: k(["feed-stream", v.value.className]),
			style: de(v.value.style)
		}, [J(Xo, { name: "feed-slide" }, {
			default: Dn(() => [(G(!0), K(H, null, z(I(t).state.queue, (e) => (G(), K("div", {
				key: e.id,
				class: k(["feed-item", [e.level, {
					clickable: !!e.panelTabId,
					"with-chips": !!e.chips?.length
				}]]),
				onClick: (t) => _(e.panelTabId)
			}, [q("div", { class: k(["feed-indicator", e.source]) }, null, 2), q("div", Ts, [
				q("div", Es, [q("span", Ds, A(e.title), 1), e.repeatCount > 1 ? (G(), K("span", Os, "x" + A(e.repeatCount), 1)) : Y("", !0)]),
				e.message ? (G(), K("span", ks, A(e.message), 1)) : Y("", !0),
				e.chips?.length ? (G(), K("div", As, [(G(!0), K(H, null, z(e.chips, (t, n) => (G(), K("span", {
					key: `${e.id}-${n}-${t.tone}-${t.label}`,
					class: "feed-chip"
				}, [q("span", { class: k(["feed-chip-dot", t.tone]) }, null, 2), q("span", null, A(t.label), 1)]))), 128))])) : Y("", !0)
			])], 10, ws))), 128))]),
			_: 1
		})], 6), q("div", {
			class: "bubble-btn",
			onPointerdown: ps(y, ["stop", "prevent"]),
			onPointermove: b,
			onPointerup: x
		}, [n[0] ||= q("span", { class: "bubble-code-icon" }, "</>", -1), u.value > 0 ? (G(), K("span", js, A(u.value), 1)) : Y("", !0)], 32)], 4));
	}
}), Is = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Ls = /* @__PURE__ */ Is(Fs, [["__scopeId", "data-v-291345d5"]]), Rs = ["night", "day"], zs = "night", Bs = { class: "settings-pane" }, Vs = { class: "settings-header" }, Hs = { class: "settings-title" }, Us = { class: "settings-description" }, Ws = { class: "settings-card settings-card-master" }, Gs = { class: "settings-card-copy" }, Ks = ["checked"], qs = { class: "settings-group" }, Js = { class: "settings-group-header" }, Ys = { class: "settings-card appearance-card" }, Xs = { class: "settings-card-copy" }, Zs = ["aria-label"], Qs = ["onClick"], $s = { class: "settings-groups" }, ec = { class: "settings-group-header" }, tc = { class: "settings-list" }, nc = { class: "settings-card-copy" }, rc = ["checked", "onChange"], ic = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "CreatorSettingsPane",
	props: {
		title: {},
		description: {},
		extensionEnabled: { type: Boolean },
		appearanceMode: {},
		features: {},
		i18n: {}
	},
	emits: [
		"toggle-extension",
		"set-appearance",
		"toggle-feature"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Z(() => n.i18n.t.bind(n.i18n)), a = [
			"character-tools",
			"extension-dev",
			"memory-dev"
		], o = {
			"character-tools": "settings.area.characterTools",
			"extension-dev": "settings.area.extensionDev",
			"memory-dev": "settings.area.memoryDev"
		}, s = {
			night: "settings.appearanceNight",
			day: "settings.appearanceDay"
		}, c = Z(() => a.map((e) => ({
			area: e,
			label: i.value(o[e]),
			features: n.features.filter((t) => t.area === e)
		})).filter((e) => e.features.length > 0)), l = Z(() => Rs.map((e) => ({
			value: e,
			labelKey: s[e]
		}))), u = (e) => {
			r("toggle-extension", e.target.checked);
		}, d = (e) => {
			r("set-appearance", e);
		}, f = (e, t) => {
			r("toggle-feature", {
				id: e,
				enabled: t.target.checked
			});
		};
		return (e, t) => (G(), K("div", Bs, [
			q("div", Vs, [q("h2", Hs, A(n.title), 1), q("p", Us, A(n.description), 1)]),
			q("label", Ws, [q("div", Gs, [q("strong", null, A(i.value("settings.enableRuntime")), 1), q("span", null, A(i.value("settings.enableRuntimeDesc")), 1)]), q("input", {
				type: "checkbox",
				class: "settings-toggle",
				checked: n.extensionEnabled,
				onChange: u
			}, null, 40, Ks)]),
			q("section", qs, [q("header", Js, [q("h3", null, A(i.value("settings.appearance")), 1)]), q("div", Ys, [q("div", Xs, [q("strong", null, A(i.value("settings.appearance")), 1), q("span", null, A(i.value("settings.appearanceDesc")), 1)]), q("div", {
				class: "appearance-toggle",
				role: "group",
				"aria-label": i.value("settings.appearance")
			}, [(G(!0), K(H, null, z(l.value, (e) => (G(), K("button", {
				key: e.value,
				type: "button",
				class: k(["appearance-option", { active: n.appearanceMode === e.value }]),
				onClick: (t) => d(e.value)
			}, A(i.value(e.labelKey)), 11, Qs))), 128))], 8, Zs)])]),
			q("div", $s, [(G(!0), K(H, null, z(c.value, (e) => (G(), K("section", {
				key: e.area,
				class: "settings-group"
			}, [q("header", ec, [q("h3", null, A(e.label), 1), q("span", null, A(i.value("settings.featureCount", { n: e.features.length })), 1)]), q("div", tc, [(G(!0), K(H, null, z(e.features, (e) => (G(), K("label", {
				key: e.id,
				class: "settings-card"
			}, [q("div", nc, [q("strong", null, A(i.value(e.titleKey)), 1), q("span", null, A(i.value(e.descriptionKey)), 1)]), q("input", {
				type: "checkbox",
				class: "settings-toggle",
				checked: e.enabled,
				onChange: (t) => f(e.id, t)
			}, null, 40, rc)]))), 128))])]))), 128))])
		]));
	}
}), [["__scopeId", "data-v-e8b37939"]]), ac = /* @__PURE__ */ fr({
	__name: "ExtensionSettings",
	setup(e) {
		let { registry: t, settings: n, i18n: r } = Cs(), i = r.t.bind(r), a = Z(() => t.features.map((e) => ({
			id: e.id,
			area: e.area,
			titleKey: e.titleKey,
			descriptionKey: e.descriptionKey,
			enabled: e.enabled
		}))), o = (e) => {
			n.setEnabled(e);
		}, s = (e) => {
			n.setAppearanceMode(e);
		}, c = async ({ id: e, enabled: n }) => {
			await t.setFeatureEnabled(e, n);
		};
		return (e, t) => (G(), aa(ic, {
			title: I(i)("settings.title"),
			description: I(i)("settings.description"),
			"extension-enabled": I(n).state.enabled,
			"appearance-mode": I(n).state.appearanceMode,
			features: a.value,
			i18n: I(r),
			onToggleExtension: o,
			onSetAppearance: s,
			onToggleFeature: t[0] ||= (e) => void c(e)
		}, null, 8, [
			"title",
			"description",
			"extension-enabled",
			"appearance-mode",
			"features",
			"i18n"
		]));
	}
}), oc = { class: "panel-sidebar" }, sc = { class: "sidebar-header" }, cc = { class: "sidebar-nav desktop-nav" }, lc = {
	key: 0,
	class: "category-title"
}, uc = ["onClick"], dc = { class: "mobile-nav" }, fc = ["onClick"], pc = { class: "panel-content" }, mc = { class: "content-header" }, hc = { class: "content-body" }, gc = {
	key: 0,
	class: "feature-host settings-host"
}, _c = {
	key: 1,
	class: "feature-host"
}, vc = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "MainPanel",
	setup(e) {
		let { registry: t, shell: n, i18n: r } = Cs(), i = r.t.bind(r), a = {
			"character-tools": "settings.area.characterTools",
			"extension-dev": "settings.area.extensionDev",
			"memory-dev": "settings.area.memoryDev"
		}, o = [
			"character-tools",
			"extension-dev",
			"memory-dev"
		], s = Z(() => n.state.activeTab), c = Z(() => t.getActiveFeatures().find((e) => e.id === s.value) ?? null), l = Z(() => [{
			id: "settings",
			label: i("panel.globalSettings")
		}, ...t.getActiveFeatures().map((e) => ({
			id: e.id,
			label: i(e.titleKey)
		}))]), u = (e) => t.getFeaturesByArea(e), d = (e) => {
			n.setActiveTab(e);
		};
		return (e, t) => (G(), K("div", {
			class: "main-panel-backdrop",
			onClick: t[3] ||= (e) => I(n).closePanel()
		}, [q("div", {
			class: "main-panel-window",
			onClick: t[2] ||= ps(() => {}, ["stop"])
		}, [q("div", oc, [
			q("div", sc, [q("h3", null, A(I(i)("panel.sidebarTitle")), 1)]),
			q("div", cc, [q("div", {
				class: k(["nav-item", { active: s.value === "settings" }]),
				onClick: t[0] ||= (e) => d("settings")
			}, A(I(i)("panel.globalSettings")), 3), (G(), K(H, null, z(o, (e) => q("div", {
				key: e,
				class: "nav-category"
			}, [u(e).length > 0 ? (G(), K("div", lc, A(I(i)(a[e])), 1)) : Y("", !0), (G(!0), K(H, null, z(u(e), (e) => (G(), K("div", {
				key: e.id,
				class: k(["nav-item sub-item", { active: s.value === e.id }]),
				onClick: (t) => d(e.id)
			}, A(I(i)(e.titleKey)), 11, uc))), 128))])), 64))]),
			q("div", dc, [(G(!0), K(H, null, z(l.value, (e) => (G(), K("button", {
				key: e.id,
				class: k(["mobile-tab", { active: s.value === e.id }]),
				onClick: (t) => d(e.id)
			}, A(e.label), 11, fc))), 128))])
		]), q("div", pc, [q("div", mc, [q("button", {
			class: "close-btn",
			onClick: t[1] ||= (e) => I(n).closePanel()
		}, "✕")]), q("div", hc, [s.value === "settings" ? (G(), K("div", gc, [J(ac)])) : c.value ? (G(), K("div", _c, [(G(), aa(Rr(c.value.component), { controller: c.value.controller }, null, 8, ["controller"]))])) : Y("", !0)])])])]));
	}
}), [["__scopeId", "data-v-2711985d"]]), yc = /* @__PURE__ */ fr({
	__name: "App",
	setup(e) {
		let { layout: t, shell: n } = Cs(), r = Z(() => n.state.panelOpen), i = Z(() => ({
			"--ttce-viewport-left": `${t.state.viewportFrame.left}px`,
			"--ttce-viewport-top": `${t.state.viewportFrame.top}px`,
			"--ttce-viewport-width": `${t.state.viewportFrame.width}px`,
			"--ttce-viewport-height": `${t.state.viewportFrame.height}px`,
			"--ttce-safe-inset-top": `${t.state.safeInsets.top}px`,
			"--ttce-safe-inset-right": `${t.state.safeInsets.right}px`,
			"--ttce-safe-inset-bottom": `${t.state.safeInsets.bottom}px`,
			"--ttce-safe-inset-left": `${t.state.safeInsets.left}px`
		}));
		return (e, t) => (G(), K("div", {
			class: "ttce-shell-root",
			style: de(i.value)
		}, [J(Ls), J(to, { name: "fade" }, {
			default: Dn(() => [r.value ? (G(), aa(vc, { key: 0 })) : Y("", !0)]),
			_: 1
		})], 4));
	}
}), bc = { class: "fact-strip" }, xc = { class: "fact-label" }, Sc = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "FactStrip",
	props: { items: {} },
	setup(e) {
		return (t, n) => (G(), K("div", bc, [(G(!0), K(H, null, z(e.items, (e) => (G(), K("div", {
			key: `${e.label}:${e.value}`,
			class: "fact-chip"
		}, [q("span", xc, A(e.label), 1), q("strong", { class: k(["fact-value", [e.tone ?? "default", { monospace: e.monospace }]]) }, A(e.value), 3)]))), 128))]));
	}
}), [["__scopeId", "data-v-a262454a"]]), Cc = {
	"settings.title": "Creator Tools",
	"settings.description": "Enable or disable the floating assistant and individual tool modules. Changes apply immediately.",
	"settings.enableRuntime": "Enable Floating Assistant",
	"settings.enableRuntimeDesc": "Show or hide the floating bubble and tool panel.",
	"settings.appearance": "Appearance",
	"settings.appearanceDesc": "Switch the extension between its own night theme and warm white day theme.",
	"settings.appearanceNight": "Night",
	"settings.appearanceDay": "Day",
	"settings.area.characterTools": "Character Authoring",
	"settings.area.extensionDev": "Debugging & Logs",
	"settings.area.memoryDev": "Chat Memory",
	"settings.featureCount": "{n} tool(s)",
	"panel.sidebarTitle": "Creator Tools",
	"panel.globalSettings": "Settings",
	"worldInfo.title": "World Book Monitor",
	"worldInfo.featureDesc": "Track which entries are included in each AI prompt",
	"worldInfo.description": "View which World Book entries were included in the latest AI prompt. Click any entry to jump to its definition.",
	"worldInfo.legendConstant": "Always Active",
	"worldInfo.legendActivated": "Triggered",
	"worldInfo.emptyNoBatch": "No World Book data yet. Start a conversation to see activated entries.",
	"worldInfo.emptyNoEntries": "No World Book entries were activated this time.",
	"worldInfo.factTrigger": "Source",
	"worldInfo.factCaptured": "Time",
	"worldInfo.factEntries": "Entries",
	"worldInfo.factWorldbooks": "Books",
	"worldInfo.factConstant": "Always Active",
	"worldInfo.factTriggered": "Triggered",
	"worldInfo.badgeConstant": "Always Active",
	"worldInfo.badgeActivated": "Triggered",
	"worldInfo.groupStats": "{entries} entries · {constant} always active · {activated} triggered",
	"worldInfo.bubbleTitle": "World Book ×{n}",
	"worldInfo.bubbleMessage": "{trigger} · {n} book(s)",
	"llmApi.title": "AI Request History",
	"llmApi.featureDesc": "View recent AI requests and responses",
	"llmApi.description": "Browse recent AI requests and responses. Switch between formatted and raw views.",
	"llmApi.keepLabel": "History Limit",
	"llmApi.apply": "Apply",
	"llmApi.prev": "← Older",
	"llmApi.next": "Newer →",
	"llmApi.reload": "Refresh",
	"llmApi.preview": "Formatted",
	"llmApi.raw": "Raw",
	"llmApi.copyRequest": "Copy Request",
	"llmApi.copyResponse": "Copy Response",
	"llmApi.requestCopied": "Request Copied",
	"llmApi.responseCopied": "Response Copied",
	"llmApi.requestPreview": "Request",
	"llmApi.requestRaw": "Raw Request",
	"llmApi.responsePreview": "Response",
	"llmApi.responseRaw": "Raw Response",
	"llmApi.empty": "No AI requests recorded yet.",
	"llmApi.loading": "Loading…",
	"llmApi.factStatus": "Status",
	"llmApi.factSource": "Source",
	"llmApi.factModel": "Model",
	"llmApi.factDuration": "Duration",
	"llmApi.factResponse": "Response",
	"llmApi.factTimestamp": "Timestamp",
	"devLogs.title": "Application Logs",
	"devLogs.featureDesc": "Monitor frontend and backend logs in real time",
	"devLogs.description": "Real-time logs from the frontend and backend. Errors and warnings also appear as floating notifications.",
	"devLogs.tabFrontend": "Frontend",
	"devLogs.tabBackend": "Backend",
	"devLogs.filterPlaceholder": "Search logs…",
	"devLogs.captureConsole": "Capture browser console",
	"devLogs.copyVisible": "Copy Visible",
	"devLogs.copied": "Copied",
	"devLogs.clearView": "Clear",
	"devLogs.emptyFiltered": "No logs match the current filter.",
	"devLogs.emptyNone": "No logs yet.",
	"devLogs.summaryLine": "{total} entries · {warnings} warnings · {errors} errors",
	"devLogs.bubbleFrontendWarn": "Frontend Warning",
	"devLogs.bubbleFrontendError": "Frontend Error",
	"devLogs.bubbleBackendWarn": "Backend Warning",
	"devLogs.bubbleBackendError": "Backend Error",
	"chatLab.title": "Chat Memory Search",
	"chatLab.featureDesc": "Look up messages by content or metadata",
	"chatLab.description": "Look up messages in the current conversation by content or metadata. Useful for testing memory and recall logic.",
	"chatLab.refreshContext": "Refresh",
	"chatLab.contextEmpty": "Open a character or group chat to get started.",
	"chatLab.tabFindLast": "Find Last Message",
	"chatLab.tabSearch": "Search Messages",
	"chatLab.findLastTitle": "Find Last Message",
	"chatLab.findLastDesc": "Find the most recent message matching a role and custom metadata keys.",
	"chatLab.fieldExtraKeys": "Custom Keys",
	"chatLab.fieldRole": "Role",
	"chatLab.fieldLimit": "Limit",
	"chatLab.fieldQuery": "Keyword",
	"chatLab.fieldQueryPlaceholder": "Enter search keyword…",
	"chatLab.btnLocate": "Find",
	"chatLab.btnSearch": "Search",
	"chatLab.searchTitle": "Search Messages",
	"chatLab.searchDesc": "Search message content with optional role filter and result limit.",
	"chatLab.resultsTitle": "Results",
	"chatLab.resultsDesc": "Switch between formatted output and raw JSON.",
	"chatLab.viewPretty": "Formatted",
	"chatLab.viewRaw": "Raw JSON",
	"chatLab.copyJson": "Copy JSON",
	"chatLab.jsonCopied": "Copied",
	"chatLab.stateLoading": "Searching…",
	"chatLab.stateEmpty": "Run a query to see results here.",
	"chatLab.errorNoChat": "Please open a character or group chat first.",
	"chatLab.noResult": "No matching messages found.",
	"chatLab.roleAny": "Any",
	"chatLab.roleUser": "User",
	"chatLab.roleAssistant": "Assistant",
	"chatLab.roleSystem": "System",
	"chatLab.factMode": "Mode",
	"chatLab.factKind": "Type",
	"chatLab.factChat": "Chat",
	"chatLab.factWindow": "Range",
	"chatLab.windowEmpty": "No messages loaded",
	"chatLab.chatUnavailable": "Not available",
	"common.expandView": "Expand view",
	"common.close": "Close",
	"common.unknownModel": "Unknown"
}, wc = {
	"settings.title": "创作者工具",
	"settings.description": "启用或关闭悬浮助手和各个工具模块。更改立即生效。",
	"settings.enableRuntime": "启用悬浮助手",
	"settings.enableRuntimeDesc": "显示或隐藏悬浮气泡与工具面板。",
	"settings.appearance": "外观",
	"settings.appearanceDesc": "切换扩展的夜间主题与日间主题。",
	"settings.appearanceNight": "夜间",
	"settings.appearanceDay": "日间",
	"settings.area.characterTools": "角色卡编写",
	"settings.area.extensionDev": "调试与日志",
	"settings.area.memoryDev": "聊天记忆",
	"settings.featureCount": "{n} 个工具",
	"panel.sidebarTitle": "创作者工具",
	"panel.globalSettings": "设置",
	"worldInfo.title": "世界书监视器",
	"worldInfo.featureDesc": "追踪每次 AI 提示词中包含了哪些条目",
	"worldInfo.description": "查看最近一次 AI 提示词中包含了哪些世界书条目。点击任意条目可跳转到对应定义。",
	"worldInfo.legendConstant": "常驻",
	"worldInfo.legendActivated": "被触发",
	"worldInfo.emptyNoBatch": "暂无世界书数据。开始对话后将显示被激活的条目。",
	"worldInfo.emptyNoEntries": "本次没有世界书条目被激活。",
	"worldInfo.factTrigger": "来源",
	"worldInfo.factCaptured": "时间",
	"worldInfo.factEntries": "条目数",
	"worldInfo.factWorldbooks": "世界书数",
	"worldInfo.factConstant": "常驻",
	"worldInfo.factTriggered": "被触发",
	"worldInfo.badgeConstant": "常驻",
	"worldInfo.badgeActivated": "被触发",
	"worldInfo.groupStats": "{entries} 个条目 · {constant} 个常驻 · {activated} 个被触发",
	"worldInfo.bubbleTitle": "世界书 ×{n}",
	"worldInfo.bubbleMessage": "{trigger} · {n} 本世界书",
	"llmApi.title": "AI 请求记录",
	"llmApi.featureDesc": "查看最近的 AI 请求与回复",
	"llmApi.description": "浏览最近的 AI 请求与回复。可切换格式化视图和原始数据。",
	"llmApi.keepLabel": "保留条数",
	"llmApi.apply": "应用",
	"llmApi.prev": "← 更早",
	"llmApi.next": "更新 →",
	"llmApi.reload": "刷新",
	"llmApi.preview": "格式化",
	"llmApi.raw": "原始数据",
	"llmApi.copyRequest": "复制请求",
	"llmApi.copyResponse": "复制回复",
	"llmApi.requestCopied": "已复制请求",
	"llmApi.responseCopied": "已复制回复",
	"llmApi.requestPreview": "请求",
	"llmApi.requestRaw": "原始请求",
	"llmApi.responsePreview": "回复",
	"llmApi.responseRaw": "原始回复",
	"llmApi.empty": "暂无 AI 请求记录。",
	"llmApi.loading": "加载中…",
	"llmApi.factStatus": "状态",
	"llmApi.factSource": "来源",
	"llmApi.factModel": "模型",
	"llmApi.factDuration": "耗时",
	"llmApi.factResponse": "响应",
	"llmApi.factTimestamp": "时间",
	"devLogs.title": "应用日志",
	"devLogs.featureDesc": "实时监控前端与后端日志",
	"devLogs.description": "前端与后端的实时日志。错误和警告也会以浮动通知显示。",
	"devLogs.tabFrontend": "前端",
	"devLogs.tabBackend": "后端",
	"devLogs.filterPlaceholder": "搜索日志…",
	"devLogs.captureConsole": "捕获浏览器控制台",
	"devLogs.copyVisible": "复制可见内容",
	"devLogs.copied": "已复制",
	"devLogs.clearView": "清空",
	"devLogs.emptyFiltered": "没有日志匹配当前筛选条件。",
	"devLogs.emptyNone": "暂无日志。",
	"devLogs.summaryLine": "{total} 条记录 · {warnings} 条警告 · {errors} 条错误",
	"devLogs.bubbleFrontendWarn": "前端警告",
	"devLogs.bubbleFrontendError": "前端错误",
	"devLogs.bubbleBackendWarn": "后端警告",
	"devLogs.bubbleBackendError": "后端错误",
	"chatLab.title": "聊天记忆搜索",
	"chatLab.featureDesc": "按内容或元数据查找消息",
	"chatLab.description": "按内容或元数据查找当前对话中的消息。适用于测试记忆与检索逻辑。",
	"chatLab.refreshContext": "刷新",
	"chatLab.contextEmpty": "请先打开一个角色或群组对话。",
	"chatLab.tabFindLast": "查找最新消息",
	"chatLab.tabSearch": "搜索消息",
	"chatLab.findLastTitle": "查找最新消息",
	"chatLab.findLastDesc": "查找符合角色与自定义元数据键的最新消息。",
	"chatLab.fieldExtraKeys": "自定义键",
	"chatLab.fieldRole": "角色",
	"chatLab.fieldLimit": "数量上限",
	"chatLab.fieldQuery": "关键词",
	"chatLab.fieldQueryPlaceholder": "输入搜索关键词…",
	"chatLab.btnLocate": "查找",
	"chatLab.btnSearch": "搜索",
	"chatLab.searchTitle": "搜索消息",
	"chatLab.searchDesc": "按关键词搜索消息内容，可选角色筛选和数量限制。",
	"chatLab.resultsTitle": "结果",
	"chatLab.resultsDesc": "可在格式化输出和原始 JSON 之间切换。",
	"chatLab.viewPretty": "格式化",
	"chatLab.viewRaw": "原始 JSON",
	"chatLab.copyJson": "复制 JSON",
	"chatLab.jsonCopied": "已复制",
	"chatLab.stateLoading": "搜索中…",
	"chatLab.stateEmpty": "执行查询后结果将显示在此处。",
	"chatLab.errorNoChat": "请先打开一个角色或群组对话。",
	"chatLab.noResult": "未找到匹配的消息。",
	"chatLab.roleAny": "全部",
	"chatLab.roleUser": "用户",
	"chatLab.roleAssistant": "助手",
	"chatLab.roleSystem": "系统",
	"chatLab.factMode": "模式",
	"chatLab.factKind": "类型",
	"chatLab.factChat": "对话",
	"chatLab.factWindow": "范围",
	"chatLab.windowEmpty": "未加载消息",
	"chatLab.chatUnavailable": "不可用",
	"common.expandView": "展开查看",
	"common.close": "关闭",
	"common.unknownModel": "未知"
}, Tc = {
	"settings.title": "創作者工具",
	"settings.description": "啟用或關閉懸浮助手和各個工具模組。變更立即生效。",
	"settings.enableRuntime": "啟用懸浮助手",
	"settings.enableRuntimeDesc": "顯示或隱藏懸浮氣泡與工具面板。",
	"settings.appearance": "外觀",
	"settings.appearanceDesc": "切換擴充套件的夜間主題與日間主題。",
	"settings.appearanceNight": "夜間",
	"settings.appearanceDay": "日間",
	"settings.area.characterTools": "角色卡編寫",
	"settings.area.extensionDev": "偵錯與日誌",
	"settings.area.memoryDev": "聊天記憶",
	"settings.featureCount": "{n} 個工具",
	"panel.sidebarTitle": "創作者工具",
	"panel.globalSettings": "設定",
	"worldInfo.title": "世界書監視器",
	"worldInfo.featureDesc": "追蹤每次 AI 提示詞中包含了哪些條目",
	"worldInfo.description": "查看最近一次 AI 提示詞中包含了哪些世界書條目。點擊任意條目可跳轉到對應定義。",
	"worldInfo.legendConstant": "常駐",
	"worldInfo.legendActivated": "被觸發",
	"worldInfo.emptyNoBatch": "暫無世界書資料。開始對話後將顯示被啟用的條目。",
	"worldInfo.emptyNoEntries": "本次沒有世界書條目被啟用。",
	"worldInfo.factTrigger": "來源",
	"worldInfo.factCaptured": "時間",
	"worldInfo.factEntries": "條目數",
	"worldInfo.factWorldbooks": "世界書數",
	"worldInfo.factConstant": "常駐",
	"worldInfo.factTriggered": "被觸發",
	"worldInfo.badgeConstant": "常駐",
	"worldInfo.badgeActivated": "被觸發",
	"worldInfo.groupStats": "{entries} 個條目 · {constant} 個常駐 · {activated} 個被觸發",
	"worldInfo.bubbleTitle": "世界書 ×{n}",
	"worldInfo.bubbleMessage": "{trigger} · {n} 本世界書",
	"llmApi.title": "AI 請求記錄",
	"llmApi.featureDesc": "查看最近的 AI 請求與回覆",
	"llmApi.description": "瀏覽最近的 AI 請求與回覆。可切換格式化檢視和原始資料。",
	"llmApi.keepLabel": "保留筆數",
	"llmApi.apply": "套用",
	"llmApi.prev": "← 更早",
	"llmApi.next": "更新 →",
	"llmApi.reload": "重新整理",
	"llmApi.preview": "格式化",
	"llmApi.raw": "原始資料",
	"llmApi.copyRequest": "複製請求",
	"llmApi.copyResponse": "複製回覆",
	"llmApi.requestCopied": "已複製請求",
	"llmApi.responseCopied": "已複製回覆",
	"llmApi.requestPreview": "請求",
	"llmApi.requestRaw": "原始請求",
	"llmApi.responsePreview": "回覆",
	"llmApi.responseRaw": "原始回覆",
	"llmApi.empty": "暫無 AI 請求記錄。",
	"llmApi.loading": "載入中…",
	"llmApi.factStatus": "狀態",
	"llmApi.factSource": "來源",
	"llmApi.factModel": "模型",
	"llmApi.factDuration": "耗時",
	"llmApi.factResponse": "回應",
	"llmApi.factTimestamp": "時間",
	"devLogs.title": "應用程式日誌",
	"devLogs.featureDesc": "即時監控前端與後端日誌",
	"devLogs.description": "前端與後端的即時日誌。錯誤與警告也會以浮動通知顯示。",
	"devLogs.tabFrontend": "前端",
	"devLogs.tabBackend": "後端",
	"devLogs.filterPlaceholder": "搜尋日誌…",
	"devLogs.captureConsole": "擷取瀏覽器主控台",
	"devLogs.copyVisible": "複製可見內容",
	"devLogs.copied": "已複製",
	"devLogs.clearView": "清除",
	"devLogs.emptyFiltered": "沒有日誌符合目前的篩選條件。",
	"devLogs.emptyNone": "暫無日誌。",
	"devLogs.summaryLine": "{total} 筆記錄 · {warnings} 筆警告 · {errors} 筆錯誤",
	"devLogs.bubbleFrontendWarn": "前端警告",
	"devLogs.bubbleFrontendError": "前端錯誤",
	"devLogs.bubbleBackendWarn": "後端警告",
	"devLogs.bubbleBackendError": "後端錯誤",
	"chatLab.title": "聊天記憶搜尋",
	"chatLab.featureDesc": "依內容或中繼資料查找訊息",
	"chatLab.description": "依內容或中繼資料查找目前對話中的訊息。適用於測試記憶與檢索邏輯。",
	"chatLab.refreshContext": "重新整理",
	"chatLab.contextEmpty": "請先開啟一個角色或群組對話。",
	"chatLab.tabFindLast": "查找最新訊息",
	"chatLab.tabSearch": "搜尋訊息",
	"chatLab.findLastTitle": "查找最新訊息",
	"chatLab.findLastDesc": "查找符合角色與自訂中繼資料鍵的最新訊息。",
	"chatLab.fieldExtraKeys": "自訂鍵",
	"chatLab.fieldRole": "角色",
	"chatLab.fieldLimit": "數量上限",
	"chatLab.fieldQuery": "關鍵字",
	"chatLab.fieldQueryPlaceholder": "輸入搜尋關鍵字…",
	"chatLab.btnLocate": "查找",
	"chatLab.btnSearch": "搜尋",
	"chatLab.searchTitle": "搜尋訊息",
	"chatLab.searchDesc": "依關鍵字搜尋訊息內容，可選角色篩選與數量限制。",
	"chatLab.resultsTitle": "結果",
	"chatLab.resultsDesc": "可在格式化輸出與原始 JSON 之間切換。",
	"chatLab.viewPretty": "格式化",
	"chatLab.viewRaw": "原始 JSON",
	"chatLab.copyJson": "複製 JSON",
	"chatLab.jsonCopied": "已複製",
	"chatLab.stateLoading": "搜尋中…",
	"chatLab.stateEmpty": "執行查詢後結果將顯示在此處。",
	"chatLab.errorNoChat": "請先開啟一個角色或群組對話。",
	"chatLab.noResult": "未找到符合的訊息。",
	"chatLab.roleAny": "全部",
	"chatLab.roleUser": "使用者",
	"chatLab.roleAssistant": "助手",
	"chatLab.roleSystem": "系統",
	"chatLab.factMode": "模式",
	"chatLab.factKind": "類型",
	"chatLab.factChat": "對話",
	"chatLab.factWindow": "範圍",
	"chatLab.windowEmpty": "未載入訊息",
	"chatLab.chatUnavailable": "不可用",
	"common.expandView": "展開檢視",
	"common.close": "關閉",
	"common.unknownModel": "未知"
}, Ec = {
	en: Cc,
	"zh-Hans": wc,
	"zh-Hant": Tc
};
function Dc() {
	let e = navigator.language;
	return e.startsWith("zh") ? /^zh-(TW|HK|MO)/i.test(e) ? "zh-Hant" : "zh-Hans" : "en";
}
function Oc(e = Dc()) {
	let t = Ec[e];
	return {
		locale: e,
		t(e, n) {
			let r = t[e];
			if (n) for (let [e, t] of Object.entries(n)) r = r.replace(`{${e}}`, String(t));
			return r;
		}
	};
}
var kc = Symbol("i18n");
function Ac() {
	let e = jn(kc);
	if (!e) throw Error("I18n context is unavailable.");
	return e;
}
//#endregion
//#region src/features/chat-lab/components/ChatLab.vue?vue&type=script&setup=true&lang.ts
var jc = { class: "chatlab-view" }, Mc = { class: "view-header" }, Nc = { class: "view-title" }, Pc = { class: "view-desc" }, Fc = {
	key: 0,
	class: "context-empty"
}, Ic = { class: "sandbox-container" }, Lc = { class: "operations-panel" }, Rc = { class: "tool-tabs" }, zc = {
	key: 0,
	class: "tool-section"
}, Bc = { class: "section-head" }, Vc = { class: "tool-grid find-grid" }, Hc = { class: "field field-span-2" }, Uc = { class: "field" }, Wc = ["value"], Gc = ["disabled"], Kc = {
	key: 1,
	class: "tool-section"
}, qc = { class: "section-head" }, Jc = { class: "tool-grid search-grid" }, Yc = { class: "field field-span-2" }, Xc = ["placeholder"], Zc = { class: "field" }, Qc = ["value"], $c = { class: "field compact" }, el = ["disabled"], tl = { class: "results-panel" }, nl = { class: "results-header" }, rl = { class: "results-actions" }, il = {
	key: 0,
	class: "toggle-group"
}, al = { class: "results-body" }, ol = {
	key: 0,
	class: "state-msg"
}, sl = {
	key: 1,
	class: "state-msg error"
}, cl = {
	key: 2,
	class: "state-msg empty"
}, ll = {
	key: 0,
	class: "json-renderer"
}, ul = {
	key: 1,
	class: "pretty-output"
}, dl = {
	key: 0,
	class: "search-results"
}, fl = { class: "result-meta" }, pl = { class: "result-badge" }, ml = { class: "result-snippet" }, hl = { class: "result-text" }, gl = {
	key: 1,
	class: "result-card"
}, _l = { class: "result-meta" }, vl = { class: "key-row" }, yl = { class: "result-text" }, bl = {
	key: 2,
	class: "result-card"
}, xl = { class: "result-text" }, Sl = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "ChatLab",
	props: { controller: {} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ Kt("find"), r = /* @__PURE__ */ Kt("idle"), i = Z(() => !!t.controller.state.windowInfo), { t: a } = Ac(), o = [
			{
				label: a("chatLab.roleAny"),
				value: "any"
			},
			{
				label: a("chatLab.roleUser"),
				value: "user"
			},
			{
				label: a("chatLab.roleAssistant"),
				value: "assistant"
			},
			{
				label: a("chatLab.roleSystem"),
				value: "system"
			}
		], s = Z(() => m(t.controller.state.windowInfo?.chatRef)), c = Z(() => {
			let e = t.controller.state.windowInfo;
			return !e || e.windowLength === 0 ? a("chatLab.windowEmpty") : `${e.windowStartIndex} - ${e.windowStartIndex + e.windowLength - 1} / ${e.totalCount - 1}`;
		}), l = Z(() => [
			{
				label: a("chatLab.factMode"),
				value: t.controller.state.windowInfo?.mode ?? "inactive"
			},
			{
				label: a("chatLab.factKind"),
				value: t.controller.state.windowInfo?.chatKind ?? "inactive"
			},
			{
				label: a("chatLab.factChat"),
				value: s.value,
				monospace: !0
			},
			{
				label: a("chatLab.factWindow"),
				value: c.value,
				monospace: !0
			}
		]), u = Z(() => {
			let e = t.controller.state.searchResult;
			return !e || Array.isArray(e) || !("index" in e) || !("message" in e) ? null : e;
		}), d = Z(() => Array.isArray(t.controller.state.searchResult) ? t.controller.state.searchResult : []), f = Z(() => JSON.stringify(t.controller.state.searchResult, null, 2)), p = Z(() => {
			let e = t.controller.state.searchResult;
			return e && !Array.isArray(e) && "message" in e && typeof e.message == "string" ? e.message : null;
		});
		function m(e) {
			return e ? e.kind === "character" ? `${e.fileName} (${e.characterId})` : e.chatId : a("chatLab.chatUnavailable");
		}
		function h(e) {
			let t = e.message.mes;
			return typeof t == "string" ? t : JSON.stringify(e.message, null, 2);
		}
		function g(e) {
			return Object.keys(e.message);
		}
		async function _() {
			await navigator.clipboard.writeText(f.value), r.value = "copied", setTimeout(() => {
				r.value = "idle";
			}, 1500);
		}
		return (e, s) => (G(), K("div", jc, [
			q("div", Mc, [q("div", null, [q("h2", Nc, A(I(a)("chatLab.title")), 1), q("p", Pc, A(I(a)("chatLab.description")), 1)]), q("button", {
				class: "toolbar-btn",
				onClick: s[0] ||= (e) => void t.controller.refreshWindowInfo()
			}, A(I(a)("chatLab.refreshContext")), 1)]),
			J(Sc, { items: l.value }, null, 8, ["items"]),
			i.value ? Y("", !0) : (G(), K("div", Fc, A(I(a)("chatLab.contextEmpty")), 1)),
			q("div", Ic, [q("div", Lc, [q("div", Rc, [q("button", {
				class: k({ active: n.value === "find" }),
				onClick: s[1] ||= (e) => n.value = "find"
			}, A(I(a)("chatLab.tabFindLast")), 3), q("button", {
				class: k({ active: n.value === "search" }),
				onClick: s[2] ||= (e) => n.value = "search"
			}, A(I(a)("chatLab.tabSearch")), 3)]), n.value === "find" ? (G(), K("section", zc, [q("div", Bc, [q("h3", null, A(I(a)("chatLab.findLastTitle")), 1), q("p", null, A(I(a)("chatLab.findLastDesc")), 1)]), q("div", Vc, [
				q("label", Hc, [q("span", null, A(I(a)("chatLab.fieldExtraKeys")), 1), On(q("input", {
					"onUpdate:modelValue": s[3] ||= (e) => t.controller.state.extraKeysInput = e,
					type: "text",
					class: "ttce-control ttce-input-control mono-input",
					placeholder: "e.g. TavernDB_ACU_IsolatedData, isUser",
					onKeyup: s[4] ||= hs((e) => void t.controller.executeFindLast(), ["enter"])
				}, null, 544), [[ss, t.controller.state.extraKeysInput]])]),
				q("label", Uc, [q("span", null, A(I(a)("chatLab.fieldRole")), 1), On(q("select", {
					"onUpdate:modelValue": s[5] ||= (e) => t.controller.state.locateRole = e,
					class: "ttce-control ttce-select-control"
				}, [(G(), K(H, null, z(o, (e) => q("option", {
					key: e.value,
					value: e.value
				}, A(e.label), 9, Wc)), 64))], 512), [[cs, t.controller.state.locateRole]])]),
				q("button", {
					class: "primary-btn action-btn",
					disabled: t.controller.state.isLoading || !i.value,
					onClick: s[6] ||= (e) => void t.controller.executeFindLast()
				}, A(I(a)("chatLab.btnLocate")), 9, Gc)
			])])) : (G(), K("section", Kc, [q("div", qc, [q("h3", null, A(I(a)("chatLab.searchTitle")), 1), q("p", null, A(I(a)("chatLab.searchDesc")), 1)]), q("div", Jc, [
				q("label", Yc, [q("span", null, A(I(a)("chatLab.fieldQuery")), 1), On(q("input", {
					"onUpdate:modelValue": s[7] ||= (e) => t.controller.state.searchQuery = e,
					type: "text",
					class: "ttce-control ttce-input-control",
					placeholder: I(a)("chatLab.fieldQueryPlaceholder"),
					onKeyup: s[8] ||= hs((e) => void t.controller.executeSearch(), ["enter"])
				}, null, 40, Xc), [[ss, t.controller.state.searchQuery]])]),
				q("label", Zc, [q("span", null, A(I(a)("chatLab.fieldRole")), 1), On(q("select", {
					"onUpdate:modelValue": s[9] ||= (e) => t.controller.state.searchRole = e,
					class: "ttce-control ttce-select-control"
				}, [(G(), K(H, null, z(o, (e) => q("option", {
					key: e.value,
					value: e.value
				}, A(e.label), 9, Qc)), 64))], 512), [[cs, t.controller.state.searchRole]])]),
				q("label", $c, [q("span", null, A(I(a)("chatLab.fieldLimit")), 1), On(q("input", {
					"onUpdate:modelValue": s[10] ||= (e) => t.controller.state.searchLimit = e,
					type: "number",
					min: "1",
					step: "1",
					class: "ttce-control ttce-number-control"
				}, null, 512), [[
					ss,
					t.controller.state.searchLimit,
					void 0,
					{ number: !0 }
				]])]),
				q("button", {
					class: "primary-btn action-btn field-span-2",
					disabled: t.controller.state.isLoading || !i.value || !t.controller.state.searchQuery.trim(),
					onClick: s[11] ||= (e) => void t.controller.executeSearch()
				}, A(I(a)("chatLab.btnSearch")), 9, el)
			])]))]), q("div", tl, [q("div", nl, [q("div", null, [q("h3", null, A(I(a)("chatLab.resultsTitle")), 1), q("p", null, A(I(a)("chatLab.resultsDesc")), 1)]), q("div", rl, [t.controller.state.searchResult ? (G(), K("div", il, [q("button", {
				class: k({ active: t.controller.state.viewMode === "pretty" }),
				onClick: s[12] ||= (e) => t.controller.state.viewMode = "pretty"
			}, A(I(a)("chatLab.viewPretty")), 3), q("button", {
				class: k({ active: t.controller.state.viewMode === "raw" }),
				onClick: s[13] ||= (e) => t.controller.state.viewMode = "raw"
			}, A(I(a)("chatLab.viewRaw")), 3)])) : Y("", !0), t.controller.state.searchResult ? (G(), K("button", {
				key: 1,
				class: "toolbar-btn",
				onClick: s[14] ||= (e) => void _()
			}, A(r.value === "copied" ? I(a)("chatLab.jsonCopied") : I(a)("chatLab.copyJson")), 1)) : Y("", !0)])]), q("div", al, [t.controller.state.isLoading ? (G(), K("div", ol, A(I(a)("chatLab.stateLoading")), 1)) : t.controller.state.errorMessage ? (G(), K("div", sl, A(t.controller.state.errorMessage), 1)) : t.controller.state.searchResult ? (G(), K(H, { key: 3 }, [t.controller.state.viewMode === "raw" ? (G(), K("pre", ll, A(f.value), 1)) : (G(), K("div", ul, [d.value.length ? (G(), K("div", dl, [(G(!0), K(H, null, z(d.value, (e) => (G(), K("article", {
				key: e.index,
				class: "result-card"
			}, [
				q("div", fl, [
					q("span", pl, A(e.role), 1),
					q("span", null, "Index " + A(e.index), 1),
					q("span", null, "Score " + A(e.score.toFixed(3)), 1)
				]),
				q("p", ml, A(e.snippet), 1),
				q("pre", hl, A(e.text), 1)
			]))), 128))])) : u.value ? (G(), K("article", gl, [
				q("div", _l, [s[15] ||= q("span", { class: "result-badge" }, "Locate Result", -1), q("span", null, "Index " + A(u.value.index), 1)]),
				q("div", vl, [(G(!0), K(H, null, z(g(u.value), (e) => (G(), K("span", {
					key: e,
					class: "key-chip"
				}, A(e), 1))), 128))]),
				q("pre", yl, A(h(u.value)), 1)
			])) : p.value ? (G(), K("article", bl, [q("pre", xl, A(p.value), 1)])) : Y("", !0)]))], 64)) : (G(), K("div", cl, A(I(a)("chatLab.stateEmpty")), 1))])])])
		]));
	}
}), [["__scopeId", "data-v-e7d4c1ac"]]);
//#endregion
//#region src/features/chat-lab/module.ts
function Cl(e) {
	return e instanceof Error ? [
		"Failed to resolve active character id",
		"SillyTavern context chatId is empty for character chat",
		"SillyTavern context chatId is empty for group chat"
	].includes(e.message) : !1;
}
function wl(e) {
	let t = /* @__PURE__ */ Ft({
		extraKeysInput: "",
		locateRole: "any",
		searchQuery: "",
		searchRole: "any",
		searchLimit: 20,
		searchResult: null,
		viewMode: "pretty",
		isLoading: !1,
		errorMessage: null,
		windowInfo: null
	}), n = () => {
		t.searchResult = null, t.errorMessage = null;
	}, r = async () => {
		try {
			return await e.host.getChatWindowInfo();
		} catch (e) {
			if (Cl(e)) return null;
			throw e;
		}
	}, i = async () => {
		t.errorMessage = null, t.windowInfo = await r();
	}, a = async () => {
		let n = await r();
		if (t.windowInfo = n, n) return n;
		throw Error(e.i18n.t("chatLab.errorNoChat"));
	};
	return {
		state: t,
		async activate() {
			await i();
		},
		async deactivate() {},
		async refreshWindowInfo() {
			await i();
		},
		async executeFindLast() {
			t.isLoading = !0, n();
			try {
				await a();
				let n = t.extraKeysInput.split(",").map((e) => e.trim()).filter(Boolean), r = t.locateRole === "any" ? void 0 : t.locateRole;
				t.searchResult = await e.host.getChatHandle().locate.findLastMessage({
					role: r,
					hasExtraKeys: n.length > 0 ? n : void 0
				}) ?? { message: "No result found" };
			} catch (e) {
				t.errorMessage = e instanceof Error ? e.message : String(e);
			} finally {
				t.isLoading = !1;
			}
		},
		async executeSearch() {
			if (t.searchQuery) {
				t.isLoading = !0, n();
				try {
					await a();
					let n = Number.isFinite(t.searchLimit) && t.searchLimit > 0 ? Math.floor(t.searchLimit) : 20, r = await e.host.getChatHandle().searchMessages({
						query: t.searchQuery,
						limit: n,
						filters: { role: t.searchRole === "any" ? void 0 : t.searchRole }
					});
					t.searchResult = r.length > 0 ? r : { message: "No result found" };
				} catch (e) {
					t.errorMessage = e instanceof Error ? e.message : String(e);
				} finally {
					t.isLoading = !1;
				}
			}
		}
	};
}
var Tl = {
	id: "chat-lab",
	area: "memory-dev",
	titleKey: "chatLab.title",
	descriptionKey: "chatLab.featureDesc",
	order: 40,
	capabilities: ["chat"],
	defaultEnabled: !0,
	component: Sl,
	createController: wl
}, El = { class: "devlogs-view" }, Dl = { class: "view-header" }, Ol = { class: "heading" }, kl = { class: "view-title" }, Al = { class: "view-desc" }, jl = { class: "log-tabs" }, Ml = { class: "toolbar" }, Nl = { class: "summary-line" }, Pl = ["placeholder"], Fl = {
	key: 0,
	class: "capture-toggle"
}, Il = ["checked"], Ll = { class: "filter-row" }, Rl = ["onClick"], zl = { class: "log-terminal" }, Bl = {
	key: 0,
	class: "log-stream"
}, Vl = { class: "log-meta" }, Hl = { class: "log-time" }, Ul = { class: "log-level" }, Wl = {
	key: 0,
	class: "log-target"
}, Gl = { class: "log-message" }, Kl = {
	key: 1,
	class: "empty-log"
}, ql = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "DevLogsViewer",
	props: { controller: {} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ Kt("frontend"), r = /* @__PURE__ */ Kt("ALL"), i = /* @__PURE__ */ Kt(""), a = /* @__PURE__ */ Kt("idle"), { t: o } = Ac(), s = (e) => new Date(e).toLocaleTimeString([], {
			hour12: !1,
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}), c = (e) => ({
			id: e.id,
			timestampMs: e.timestampMs,
			level: e.level.toUpperCase(),
			message: e.message,
			target: e.target
		}), l = (e) => ({
			id: e.id,
			timestampMs: e.timestampMs,
			level: e.level,
			message: e.message,
			target: e.target
		}), u = Z(() => n.value === "frontend" ? t.controller.state.frontendLogs.map(c) : t.controller.state.backendLogs.map(l)), d = Z(() => {
			let e = i.value.trim().toLowerCase();
			return u.value.filter((t) => r.value !== "ALL" && t.level !== r.value ? !1 : e ? [
				t.message,
				t.target ?? "",
				t.level
			].some((t) => t.toLowerCase().includes(e)) : !0);
		}), f = Z(() => {
			let e = u.value, t = e.filter((e) => e.level === "WARN").length, n = e.filter((e) => e.level === "ERROR").length;
			return o("devLogs.summaryLine", {
				total: e.length,
				warnings: t,
				errors: n
			});
		}), p = async () => {
			let e = d.value.map((e) => {
				let t = e.target ? ` [${e.target}]` : "";
				return `[${s(e.timestampMs)}] [${e.level}]${t} ${e.message}`;
			}).join("\n");
			await navigator.clipboard.writeText(e), a.value = "copied", setTimeout(() => {
				a.value = "idle";
			}, 1500);
		}, m = () => {
			t.controller.clearLogs(n.value);
		}, h = async (e) => {
			let n = e.target;
			await t.controller.setFrontendConsoleCaptureEnabled(n.checked);
		};
		return (e, c) => (G(), K("div", El, [
			q("div", Dl, [q("div", Ol, [q("h2", kl, A(I(o)("devLogs.title")), 1), q("p", Al, A(I(o)("devLogs.description")), 1)]), q("div", jl, [q("button", {
				class: k({ active: n.value === "frontend" }),
				onClick: c[0] ||= (e) => n.value = "frontend"
			}, A(I(o)("devLogs.tabFrontend")), 3), q("button", {
				class: k({ active: n.value === "backend" }),
				onClick: c[1] ||= (e) => n.value = "backend"
			}, A(I(o)("devLogs.tabBackend")), 3)])]),
			q("div", Ml, [
				q("span", Nl, A(f.value), 1),
				On(q("input", {
					"onUpdate:modelValue": c[2] ||= (e) => i.value = e,
					type: "search",
					class: "search-input ttce-control ttce-input-control",
					placeholder: I(o)("devLogs.filterPlaceholder")
				}, null, 8, Pl), [[ss, i.value]]),
				n.value === "frontend" ? (G(), K("label", Fl, [q("input", {
					checked: t.controller.state.frontendConsoleCaptureEnabled,
					type: "checkbox",
					onChange: c[3] ||= (e) => void h(e)
				}, null, 40, Il), q("span", null, A(I(o)("devLogs.captureConsole")), 1)])) : Y("", !0),
				q("button", {
					class: "toolbar-btn",
					onClick: c[4] ||= (e) => void p()
				}, A(a.value === "copied" ? I(o)("devLogs.copied") : I(o)("devLogs.copyVisible")), 1),
				q("button", {
					class: "toolbar-btn",
					onClick: c[5] ||= (e) => m()
				}, A(I(o)("devLogs.clearView")), 1)
			]),
			q("div", Ll, [(G(), K(H, null, z([
				"ALL",
				"DEBUG",
				"INFO",
				"WARN",
				"ERROR"
			], (e) => q("button", {
				key: e,
				class: k(["filter-chip", { active: r.value === e }]),
				onClick: (t) => r.value = e
			}, A(e), 11, Rl)), 64))]),
			q("div", zl, [d.value.length ? (G(), K("div", Bl, [(G(!0), K(H, null, z(d.value, (e) => (G(), K("div", {
				key: `${n.value}-${e.id}`,
				class: k(["log-row", e.level.toLowerCase()])
			}, [q("div", Vl, [
				q("span", Hl, A(s(e.timestampMs)), 1),
				q("span", Ul, A(e.level), 1),
				e.target ? (G(), K("span", Wl, A(e.target), 1)) : Y("", !0)
			]), q("div", Gl, A(e.message), 1)], 2))), 128))])) : (G(), K("div", Kl, A(u.value.length ? I(o)("devLogs.emptyFiltered") : I(o)("devLogs.emptyNone")), 1))])
		]));
	}
}), [["__scopeId", "data-v-fe4ec4d2"]]), Jl = "dev-logs-tools";
function Yl(e) {
	let t = /* @__PURE__ */ Ft({
		frontendLogs: [],
		backendLogs: [],
		frontendConsoleCaptureEnabled: !1
	}), n = null, r = null;
	return {
		state: t,
		async activate() {
			let i = e.host.api.dev.frontendLogs, a = e.host.api.dev.backendLogs;
			t.frontendConsoleCaptureEnabled = await i.getConsoleCaptureEnabled(), t.frontendLogs = await i.list({ limit: 100 }), t.backendLogs = await a.tail({ limit: 100 }), n = await i.subscribe((n) => {
				if (t.frontendLogs.unshift(n), t.frontendLogs.length > 500 && t.frontendLogs.pop(), n.level === "warn" || n.level === "error") {
					let t = n.level === "error" ? "devLogs.bubbleFrontendError" : "devLogs.bubbleFrontendWarn";
					e.bubbleBus.push({
						source: "frontend-log",
						level: n.level,
						title: e.i18n.t(t),
						message: n.message,
						panelTabId: Jl
					});
				}
			}), r = await a.subscribe((n) => {
				if (t.backendLogs.unshift(n), t.backendLogs.length > 500 && t.backendLogs.pop(), n.level === "WARN" || n.level === "ERROR") {
					let t = n.level === "ERROR" ? "devLogs.bubbleBackendError" : "devLogs.bubbleBackendWarn";
					e.bubbleBus.push({
						source: "backend-log",
						level: n.level === "ERROR" ? "error" : "warn",
						title: e.i18n.t(t),
						message: n.message,
						panelTabId: Jl
					});
				}
			});
		},
		async deactivate() {
			await n?.(), await r?.(), n = null, r = null;
		},
		async setFrontendConsoleCaptureEnabled(n) {
			await e.host.api.dev.frontendLogs.setConsoleCaptureEnabled(n), t.frontendConsoleCaptureEnabled = n;
		},
		clearLogs(e) {
			(e === "frontend" || e === "all") && (t.frontendLogs = []), (e === "backend" || e === "all") && (t.backendLogs = []);
		}
	};
}
var Xl = {
	id: Jl,
	area: "extension-dev",
	titleKey: "devLogs.title",
	descriptionKey: "devLogs.featureDesc",
	order: 30,
	capabilities: ["dev.frontendLogs", "dev.backendLogs"],
	defaultEnabled: !0,
	component: ql,
	createController: Yl
}, Zl = { class: "expandable-pane" }, Ql = { class: "section-header" }, $l = ["title", "aria-label"], eu = ["data-ttce-appearance"], tu = { class: "viewer-dialog" }, nu = { class: "viewer-header" }, ru = ["title", "aria-label"], iu = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "ExpandableTextPane",
	props: {
		title: {},
		text: {},
		raw: { type: Boolean },
		fullscreenTitle: {}
	},
	setup(e) {
		let t = e, n = /* @__PURE__ */ Kt(!1), { t: r } = Ac(), { settings: i } = Cs(), a = Z(() => t.fullscreenTitle ?? t.title), o = Z(() => i.state.appearanceMode), s = () => {
			n.value = !1;
		}, c = (e) => {
			e.key === "Escape" && s();
		};
		return Pn(n, (e) => {
			if (e) {
				window.addEventListener("keydown", c);
				return;
			}
			window.removeEventListener("keydown", c);
		}), Ar(() => {
			window.removeEventListener("keydown", c);
		}), (e, i) => (G(), K("section", Zl, [
			q("div", Ql, [q("h4", null, A(t.title), 1), q("button", {
				type: "button",
				class: "expand-btn",
				title: I(r)("common.expandView"),
				"aria-label": I(r)("common.expandView"),
				onClick: i[0] ||= (e) => n.value = !0
			}, " ⤢ ", 8, $l)]),
			q("pre", { class: k(["text-viewer", { raw: t.raw }]) }, A(t.text), 3),
			(G(), aa(Jn, { to: "body" }, [n.value ? (G(), K("div", {
				key: 0,
				class: "viewer-backdrop ttce-theme-root",
				"data-ttce-appearance": o.value,
				onClick: ps(s, ["self"])
			}, [q("div", tu, [q("div", nu, [q("h3", null, A(a.value), 1), q("button", {
				type: "button",
				class: "viewer-close",
				title: I(r)("common.close"),
				"aria-label": I(r)("common.close"),
				onClick: s
			}, " ✕ ", 8, ru)]), q("pre", { class: k(["viewer-content", { raw: t.raw }]) }, A(t.text), 3)])], 8, eu)) : Y("", !0)]))
		]));
	}
}), [["__scopeId", "data-v-1aa0d9cc"]]), au = { class: "llmapi-view" }, ou = { class: "view-header" }, su = { class: "view-title" }, cu = { class: "view-desc" }, lu = { class: "keep-toolbar" }, uu = { class: "keep-control" }, du = {
	key: 0,
	class: "viewer-shell"
}, fu = { class: "viewer-toolbar" }, pu = { class: "nav-group" }, mu = ["disabled"], hu = ["disabled"], gu = { class: "position-label" }, _u = { class: "action-group" }, vu = { class: "toggle-group" }, yu = { class: "detail-head" }, bu = { class: "detail-title-row" }, xu = { class: "detail-endpoint" }, Su = {
	key: 0,
	class: "error-callout"
}, Cu = { class: "body-stack" }, wu = {
	key: 1,
	class: "empty-detail"
}, Tu = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "LlmApiViewer",
	props: { controller: {} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ Kt(String(t.controller.state.keepLimit)), r = /* @__PURE__ */ Kt("idle"), { t: i } = Ac();
		Pn(() => t.controller.state.keepLimit, (e) => {
			n.value = String(e);
		}, { immediate: !0 });
		let a = Z(() => t.controller.state.logs.findIndex((e) => e.id === t.controller.state.selectedId)), o = Z(() => t.controller.state.logs[a.value] ?? null), s = Z(() => a.value < 0 ? "0 / 0" : `${a.value + 1} / ${t.controller.state.logs.length}`), c = Z(() => t.controller.state.viewMode === "raw"), l = Z(() => c.value ? i("llmApi.requestRaw") : i("llmApi.requestPreview")), u = Z(() => c.value ? i("llmApi.responseRaw") : i("llmApi.responsePreview")), d = Z(() => c.value ? t.controller.state.loadingRaw ? i("llmApi.loading") : t.controller.state.selectedRaw?.requestRaw ?? "" : t.controller.state.loadingPreview ? i("llmApi.loading") : t.controller.state.selectedPreview?.requestReadable ?? ""), f = Z(() => c.value ? t.controller.state.loadingRaw ? i("llmApi.loading") : t.controller.state.selectedRaw?.responseRaw ?? "" : t.controller.state.loadingPreview ? i("llmApi.loading") : t.controller.state.selectedPreview?.responseReadable ?? ""), p = Z(() => o.value ? `Entry #${o.value.id} - ${l.value}` : l.value), m = Z(() => o.value ? `Entry #${o.value.id} - ${u.value}` : u.value), h = Z(() => {
			let e = o.value;
			return e ? [
				{
					label: i("llmApi.factStatus"),
					value: e.ok ? "OK" : "ERROR",
					tone: e.ok ? "green" : "red"
				},
				{
					label: i("llmApi.factSource"),
					value: e.source
				},
				{
					label: i("llmApi.factModel"),
					value: e.model ?? i("common.unknownModel")
				},
				{
					label: i("llmApi.factDuration"),
					value: `${e.durationMs}ms`,
					monospace: !0
				},
				{
					label: i("llmApi.factResponse"),
					value: t.controller.state.selectedPreview?.responseRawKind ?? t.controller.state.selectedRaw?.responseRawKind ?? "unknown"
				},
				{
					label: i("llmApi.factTimestamp"),
					value: g(e.timestampMs),
					monospace: !0
				}
			] : [];
		}), g = (e) => new Date(e).toLocaleString([], {
			hour12: !1,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}), _ = async () => {
			let e = Number.parseInt(n.value, 10);
			if (Number.isNaN(e) || e < 1) {
				n.value = String(t.controller.state.keepLimit);
				return;
			}
			await t.controller.setKeepLimit(e);
		}, v = async (e) => {
			if (a.value < 0) return;
			let n = a.value + e, r = t.controller.state.logs[n];
			r && await t.controller.selectLog(r.id);
		}, y = async (e) => {
			let n = t.controller.state.viewMode === "preview" ? e === "request" ? t.controller.state.selectedPreview?.requestReadable ?? "" : t.controller.state.selectedPreview?.responseReadable ?? "" : e === "request" ? t.controller.state.selectedRaw?.requestRaw ?? "" : t.controller.state.selectedRaw?.responseRaw ?? "";
			await navigator.clipboard.writeText(n), r.value = e, setTimeout(() => {
				r.value = "idle";
			}, 1500);
		};
		return (e, g) => (G(), K("div", au, [q("div", ou, [q("div", null, [q("h2", su, A(I(i)("llmApi.title")), 1), q("p", cu, A(I(i)("llmApi.description")), 1)]), q("div", lu, [q("label", uu, [q("span", null, A(I(i)("llmApi.keepLabel")), 1), On(q("input", {
			"onUpdate:modelValue": g[0] ||= (e) => n.value = e,
			type: "number",
			min: "1",
			step: "1",
			class: "ttce-control ttce-number-control",
			onKeyup: g[1] ||= hs((e) => void _(), ["enter"])
		}, null, 544), [[ss, n.value]])]), q("button", {
			class: "toolbar-btn",
			onClick: g[2] ||= (e) => void _()
		}, A(I(i)("llmApi.apply")), 1)])]), o.value ? (G(), K("div", du, [
			q("div", fu, [q("div", pu, [
				q("button", {
					class: "toolbar-btn",
					disabled: a.value >= t.controller.state.logs.length - 1,
					onClick: g[3] ||= (e) => void v(1)
				}, A(I(i)("llmApi.prev")), 9, mu),
				q("button", {
					class: "toolbar-btn",
					disabled: a.value <= 0,
					onClick: g[4] ||= (e) => void v(-1)
				}, A(I(i)("llmApi.next")), 9, hu),
				q("span", gu, A(s.value), 1)
			]), q("div", _u, [
				q("button", {
					class: "toolbar-btn",
					onClick: g[5] ||= (e) => void t.controller.reloadSelection()
				}, A(I(i)("llmApi.reload")), 1),
				q("div", vu, [q("button", {
					class: k({ active: t.controller.state.viewMode === "preview" }),
					onClick: g[6] ||= (e) => void t.controller.setViewMode("preview")
				}, A(I(i)("llmApi.preview")), 3), q("button", {
					class: k({ active: t.controller.state.viewMode === "raw" }),
					onClick: g[7] ||= (e) => void t.controller.setViewMode("raw")
				}, A(I(i)("llmApi.raw")), 3)]),
				q("button", {
					class: "toolbar-btn",
					onClick: g[8] ||= (e) => void y("request")
				}, A(r.value === "request" ? I(i)("llmApi.requestCopied") : I(i)("llmApi.copyRequest")), 1),
				q("button", {
					class: "toolbar-btn",
					onClick: g[9] ||= (e) => void y("response")
				}, A(r.value === "response" ? I(i)("llmApi.responseCopied") : I(i)("llmApi.copyResponse")), 1)
			])]),
			q("div", yu, [q("div", bu, [q("h3", null, "Entry #" + A(o.value.id), 1), q("span", xu, A(o.value.endpoint), 1)]), J(Sc, { items: h.value }, null, 8, ["items"])]),
			t.controller.state.selectedPreview?.errorMessage && t.controller.state.viewMode === "preview" ? (G(), K("div", Su, A(t.controller.state.selectedPreview.errorMessage), 1)) : Y("", !0),
			q("div", Cu, [J(iu, {
				class: "detail-section request",
				title: l.value,
				"fullscreen-title": p.value,
				text: d.value,
				raw: c.value
			}, null, 8, [
				"title",
				"fullscreen-title",
				"text",
				"raw"
			]), J(iu, {
				class: "detail-section response",
				title: u.value,
				"fullscreen-title": m.value,
				text: f.value,
				raw: c.value
			}, null, 8, [
				"title",
				"fullscreen-title",
				"text",
				"raw"
			])])
		])) : (G(), K("div", wu, A(I(i)("llmApi.empty")), 1))]));
	}
}), [["__scopeId", "data-v-3cb39889"]]);
//#endregion
//#region src/features/llm-api/module.ts
function Eu(e) {
	let t = /* @__PURE__ */ Ft({
		logs: [],
		selectedId: null,
		selectedPreview: null,
		selectedRaw: null,
		viewMode: "preview",
		keepLimit: 20,
		loadingIndex: !1,
		loadingPreview: !1,
		loadingRaw: !1
	}), n = null, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = e.host.api.dev.llmApiLogs, o = () => {
		t.selectedId = null, t.selectedPreview = null, t.selectedRaw = null;
	}, s = async (e, n = !1) => {
		try {
			if (!n) {
				let n = r.get(e);
				if (n) {
					t.selectedPreview = n;
					return;
				}
			}
			t.loadingPreview = !0;
			let i = await a.getPreview(e);
			r.set(e, i), t.selectedId === e && (t.selectedPreview = i);
		} finally {
			t.loadingPreview = !1;
		}
	}, c = async (e, n = !1) => {
		try {
			if (!n) {
				let n = i.get(e);
				if (n) {
					t.selectedRaw = n;
					return;
				}
			}
			t.loadingRaw = !0;
			let r = await a.getRaw(e);
			i.set(e, r), t.selectedId === e && (t.selectedRaw = r);
		} finally {
			t.loadingRaw = !1;
		}
	}, l = () => {
		if (t.selectedId === null || t.logs.some((e) => e.id === t.selectedId)) return;
		let e = t.logs[0];
		if (!e) {
			o();
			return;
		}
		t.selectedId = e.id, t.selectedPreview = r.get(e.id) ?? null, t.selectedRaw = i.get(e.id) ?? null, s(e.id), t.viewMode === "raw" && c(e.id);
	}, u = async (e = !0) => {
		try {
			t.loadingIndex = !0, t.logs = await a.index({ limit: t.keepLimit });
		} finally {
			t.loadingIndex = !1;
		}
		if (!t.logs.length) {
			o();
			return;
		}
		await d(e && t.selectedId !== null && t.logs.some((e) => e.id === t.selectedId) ? t.selectedId : t.logs[0].id);
	}, d = async (e) => {
		t.selectedId = e, t.selectedPreview = r.get(e) ?? null, t.selectedRaw = i.get(e) ?? null, await s(e), t.viewMode === "raw" && await c(e);
	};
	return {
		state: t,
		async activate() {
			t.keepLimit = await a.getKeep(), await u(!1), n = await a.subscribeIndex((e) => {
				let n = t.selectedId === null || t.selectedId === t.logs[0]?.id;
				if (t.logs.unshift(e), t.logs.length > t.keepLimit && t.logs.pop(), n) {
					d(e.id);
					return;
				}
				l();
			});
		},
		async deactivate() {
			await n?.(), n = null;
		},
		async reloadIndex() {
			await u();
		},
		async reloadSelection() {
			t.selectedId !== null && (r.delete(t.selectedId), i.delete(t.selectedId), t.selectedPreview = null, t.selectedRaw = null, await s(t.selectedId, !0), t.viewMode === "raw" && await c(t.selectedId, !0));
		},
		async selectLog(e) {
			await d(e);
		},
		async setViewMode(e) {
			if (t.viewMode = e, t.selectedId !== null) {
				if (e === "raw") {
					await c(t.selectedId);
					return;
				}
				await s(t.selectedId);
			}
		},
		async setKeepLimit(e) {
			await a.setKeep(e), t.keepLimit = e, await u();
		}
	};
}
var Du = {
	id: "llm-api-tools",
	area: "character-tools",
	titleKey: "llmApi.title",
	descriptionKey: "llmApi.featureDesc",
	order: 20,
	capabilities: ["dev.llmApiLogs"],
	defaultEnabled: !0,
	component: Tu,
	createController: Eu
}, Ou = { class: "worldinfo-view" }, ku = { class: "view-header" }, Au = { class: "view-title" }, ju = { class: "view-desc" }, Mu = { class: "legend" }, Nu = { class: "legend-chip" }, Pu = { class: "legend-chip" }, Fu = {
	key: 0,
	class: "empty-state"
}, Iu = {
	key: 1,
	class: "batch-layout"
}, Lu = {
	key: 0,
	class: "empty-state compact"
}, Ru = {
	key: 1,
	class: "world-groups"
}, zu = { class: "group-header" }, Bu = { class: "entry-list" }, Vu = ["onClick"], Hu = { class: "entry-main" }, Uu = { class: "entry-copy" }, Wu = { class: "entry-name" }, Gu = { class: "entry-meta" }, Ku = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "WorldInfoFeed",
	props: { controller: {} },
	setup(e) {
		let t = e, { t: n } = Ac(), r = {
			before: "Before Prompt",
			after: "After Prompt",
			an_top: "AN Top",
			an_bottom: "AN Bottom",
			depth: "Depth",
			em_top: "EM Top",
			em_bottom: "EM Bottom",
			outlet: "Outlet"
		}, i = Z(() => {
			let e = t.controller.state.lastBatch?.entries ?? [];
			return {
				total: e.length,
				constant: e.filter((e) => e.constant).length,
				activated: e.filter((e) => !e.constant).length,
				worlds: new Set(e.map((e) => e.world)).size
			};
		}), a = Z(() => {
			let e = t.controller.state.lastBatch;
			return e ? [
				{
					label: n("worldInfo.factTrigger"),
					value: e.trigger
				},
				{
					label: n("worldInfo.factCaptured"),
					value: s(e.timestampMs),
					monospace: !0
				},
				{
					label: n("worldInfo.factEntries"),
					value: i.value.total
				},
				{
					label: n("worldInfo.factWorldbooks"),
					value: i.value.worlds
				},
				{
					label: n("worldInfo.factConstant"),
					value: i.value.constant,
					tone: "blue"
				},
				{
					label: n("worldInfo.factTriggered"),
					value: i.value.activated,
					tone: "green"
				}
			] : [];
		}), o = Z(() => {
			let e = t.controller.state.lastBatch?.entries ?? [], n = /* @__PURE__ */ new Map();
			for (let t of e) {
				let e = n.get(t.world);
				e || (e = {
					world: t.world,
					entries: [],
					activatedCount: 0,
					constantCount: 0
				}, n.set(t.world, e)), e.entries.push(t), t.constant ? e.constantCount += 1 : e.activatedCount += 1;
			}
			return Array.from(n.values()).map((e) => ({
				...e,
				entries: e.entries.slice().sort((e, t) => Number(t.constant) - Number(e.constant))
			}));
		}), s = (e) => new Date(e).toLocaleString([], {
			hour12: !1,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}), c = (e) => e ? r[e] ?? e : "Default";
		return (e, r) => (G(), K("div", Ou, [q("div", ku, [q("div", null, [q("h2", Au, A(I(n)("worldInfo.title")), 1), q("p", ju, A(I(n)("worldInfo.description")), 1)]), q("div", Mu, [q("span", Nu, [r[0] ||= q("span", { class: "legend-dot constant" }, null, -1), q("span", null, A(I(n)("worldInfo.legendConstant")), 1)]), q("span", Pu, [r[1] ||= q("span", { class: "legend-dot activated" }, null, -1), q("span", null, A(I(n)("worldInfo.legendActivated")), 1)])])]), t.controller.state.lastBatch ? (G(), K("div", Iu, [J(Sc, { items: a.value }, null, 8, ["items"]), i.value.total === 0 ? (G(), K("div", Lu, A(I(n)("worldInfo.emptyNoEntries")), 1)) : (G(), K("div", Ru, [(G(!0), K(H, null, z(o.value, (e) => (G(), K("section", {
			key: e.world,
			class: "world-group"
		}, [q("header", zu, [q("div", null, [q("h3", null, A(e.world), 1), q("p", null, A(I(n)("worldInfo.groupStats", {
			entries: e.entries.length,
			constant: e.constantCount,
			activated: e.activatedCount
		})), 1)])]), q("div", Bu, [(G(!0), K(H, null, z(e.entries, (e) => (G(), K("button", {
			key: `${e.world}-${e.uid}`,
			type: "button",
			class: "entry-card",
			onClick: (n) => void t.controller.openEntry(e.world, e.uid)
		}, [q("div", Hu, [q("span", { class: k(["entry-dot", {
			constant: e.constant,
			activated: !e.constant
		}]) }, null, 2), q("div", Uu, [q("div", Wu, A(e.displayName), 1), q("div", Gu, "UID " + A(e.uid) + " · " + A(c(e.position)), 1)])]), q("span", { class: k(["entry-badge", {
			constant: e.constant,
			activated: !e.constant
		}]) }, A(e.constant ? I(n)("worldInfo.badgeConstant") : I(n)("worldInfo.badgeActivated")), 3)], 8, Vu))), 128))])]))), 128))]))])) : (G(), K("div", Fu, A(I(n)("worldInfo.emptyNoBatch")), 1))]));
	}
}), [["__scopeId", "data-v-ceac820d"]]), qu = "world-info-tools";
function Ju(e) {
	return e.entries.map((e) => ({
		label: e.displayName,
		tone: e.constant ? "world-info-constant" : "world-info"
	}));
}
function Yu(e) {
	let t = /* @__PURE__ */ Ft({ lastBatch: null }), n = null;
	return {
		state: t,
		async activate() {
			let r = e.host.api.worldInfo;
			t.lastBatch = await r.getLastActivation(), n = await r.subscribeActivations((n) => {
				if (t.lastBatch = n, !n.entries.length) return;
				let r = new Set(n.entries.map((e) => e.world));
				e.bubbleBus.push({
					source: "world-info",
					level: "info",
					title: e.i18n.t("worldInfo.bubbleTitle", { n: n.entries.length }),
					message: e.i18n.t("worldInfo.bubbleMessage", {
						trigger: n.trigger,
						n: r.size
					}),
					chips: Ju(n),
					panelTabId: qu,
					meta: { trigger: n.trigger }
				});
			});
		},
		async deactivate() {
			await n?.(), n = null;
		},
		async openEntry(t, n) {
			await e.host.api.worldInfo.openEntry({
				world: t,
				uid: n
			}), e.shell.closePanel();
		}
	};
}
//#endregion
//#region src/features/modules.ts
var Xu = [
	{
		id: qu,
		area: "character-tools",
		titleKey: "worldInfo.title",
		descriptionKey: "worldInfo.featureDesc",
		order: 10,
		capabilities: ["worldInfo"],
		defaultEnabled: !0,
		component: Ku,
		createController: Yu
	},
	Du,
	Xl,
	Tl
];
//#endregion
//#region src/features/catalog.ts
function Zu(e) {
	return e.slice().sort((e, t) => e.order - t.order);
}
function Qu(e) {
	return Zu(Xu).filter((t) => e.supportsAll(t.capabilities));
}
//#endregion
//#region src/features/registry.ts
function $u(e) {
	let t = /* @__PURE__ */ Ft(Qu(e.host).map((t) => ({
		id: t.id,
		area: t.area,
		titleKey: t.titleKey,
		descriptionKey: t.descriptionKey,
		order: t.order,
		capabilities: t.capabilities,
		component: t.component,
		controller: t.createController(e),
		enabled: e.settings.isFeatureEnabled(t.id, t.defaultEnabled),
		active: !1
	}))), n = (e) => {
		let n = t.find((t) => t.id === e);
		if (!n) throw Error(`Unknown feature: ${e}`);
		return n;
	}, r = async (e) => {
		e.active ||= (await e.controller.activate(), !0);
	}, i = async (e) => {
		e.active &&= (await e.controller.deactivate(), !1);
	};
	return {
		features: t,
		async activateEnabledFeatures() {
			for (let e of t) e.enabled && await r(e);
		},
		async deactivateAllFeatures() {
			for (let e of t) await i(e);
		},
		async setFeatureEnabled(t, a) {
			let o = n(t);
			if (o.enabled !== a) {
				if (a) {
					await r(o), o.enabled = !0, e.settings.setFeatureEnabled(t, !0);
					return;
				}
				await i(o), o.enabled = !1, e.settings.setFeatureEnabled(t, !1), e.shell.state.activeTab === t && e.shell.setActiveTab("settings");
			}
		},
		getFeaturesByArea(e) {
			return t.filter((t) => t.enabled && t.area === e);
		},
		getActiveFeatures() {
			return t.filter((e) => e.active);
		}
	};
}
//#endregion
//#region src/app/shell-store.ts
function ed(e, t) {
	let n = /* @__PURE__ */ Ft({
		panelOpen: !1,
		activeTab: e.state.activeTab
	}), r = (t) => {
		n.activeTab = t, e.setActiveTab(t);
	}, i = (e) => {
		e && r(e), n.panelOpen = !0, t.markAllRead();
	};
	return {
		state: n,
		openPanel: i,
		closePanel() {
			n.panelOpen = !1;
		},
		togglePanel(e) {
			if (n.panelOpen && !e) {
				n.panelOpen = !1;
				return;
			}
			i(e);
		},
		setActiveTab: r
	};
}
//#endregion
//#region src/app/settings-store.ts
var td = "ttce:settings";
function nd() {
	return {
		enabled: !0,
		enabledFeatures: {},
		bubblePosition: null,
		activeTab: "settings",
		appearanceMode: zs
	};
}
function rd() {
	let e = localStorage.getItem(td);
	if (!e) return nd();
	try {
		let t = JSON.parse(e);
		return {
			...nd(),
			...t,
			appearanceMode: t.appearanceMode === "day" ? "day" : zs
		};
	} catch {
		return nd();
	}
}
function id(e) {
	return {
		enabled: e.enabled,
		enabledFeatures: { ...e.enabledFeatures },
		bubblePosition: e.bubblePosition ? { ...e.bubblePosition } : null,
		activeTab: e.activeTab,
		appearanceMode: e.appearanceMode
	};
}
function ad() {
	let e = /* @__PURE__ */ Ft(rd()), t = /* @__PURE__ */ new Set(), n = () => {
		localStorage.setItem(td, JSON.stringify(id(e)));
	}, r = () => {
		n(), t.forEach((e) => e());
	};
	return {
		state: e,
		subscribe(e) {
			return t.add(e), () => {
				t.delete(e);
			};
		},
		setEnabled(t) {
			e.enabled !== t && (e.enabled = t, r());
		},
		setAppearanceMode(t) {
			e.appearanceMode !== t && (e.appearanceMode = t, r());
		},
		isFeatureEnabled(t, n) {
			return e.enabledFeatures[t] ?? n;
		},
		setFeatureEnabled(t, n) {
			e.enabledFeatures[t] !== n && (e.enabledFeatures[t] = n, r());
		},
		setBubblePosition(t) {
			e.bubblePosition?.x === t.x && e.bubblePosition?.y === t.y || (e.bubblePosition = { ...t }, r());
		},
		setActiveTab(t) {
			e.activeTab !== t && (e.activeTab = t, r());
		}
	};
}
//#endregion
//#region src/shell/bubble/bubble-feed-bus.ts
function od() {
	let e = /* @__PURE__ */ Ft({
		queue: [],
		unreadCount: 0
	}), t = 0, n = /* @__PURE__ */ new Map(), r = (e) => {
		let t = n.get(e);
		t !== void 0 && clearTimeout(t);
		let r = setTimeout(() => i(e), 5e3);
		n.set(e, r);
	}, i = (t) => {
		let r = n.get(t);
		r !== void 0 && (clearTimeout(r), n.delete(t));
		let i = e.queue.findIndex((e) => e.id === t);
		i !== -1 && e.queue.splice(i, 1);
	}, a = (e, t) => e === t ? !0 : !e || !t || e.length !== t.length ? !1 : e.every((e, n) => {
		let r = t[n];
		return e.label === r.label && e.tone === r.tone;
	}), o = (t) => {
		for (let n = e.queue.length - 1; n >= 0; --n) {
			let r = e.queue[n];
			if (r.source === t.source && r.level === t.level && r.title === t.title && r.message === t.message && r.panelTabId === t.panelTabId && a(r.chips, t.chips)) return n;
		}
		return -1;
	};
	return {
		state: e,
		push(n) {
			let i = o(n);
			if (i !== -1) {
				let [t] = e.queue.splice(i, 1);
				t.repeatCount += 1, t.timestampMs = Date.now(), e.queue.push(t), e.unreadCount += 1, r(t.id);
				return;
			}
			let a = {
				...n,
				id: `feed_${Date.now()}_${t}`,
				timestampMs: Date.now(),
				repeatCount: 1
			};
			t += 1, e.queue.push(a), e.unreadCount += 1, r(a.id);
		},
		remove: i,
		markAllRead() {
			e.unreadCount = 0;
		}
	};
}
//#endregion
//#region src/app/layout-store.ts
var sd = 768;
function cd(e = 0, t = 0, n = 0, r = 0) {
	return {
		top: Math.max(0, e),
		right: Math.max(0, t),
		bottom: Math.max(0, n),
		left: Math.max(0, r)
	};
}
function ld(e = 0, t = 0, n = 0, r = 0) {
	let i = Math.max(0, e), a = Math.max(0, t), o = Math.max(0, n), s = Math.max(0, r);
	return {
		left: i,
		top: a,
		width: o,
		height: s,
		right: i + o,
		bottom: a + s
	};
}
function ud(e, t, n, r, i) {
	e.left = Math.max(0, t), e.top = Math.max(0, n), e.width = Math.max(0, r), e.height = Math.max(0, i), e.right = e.left + e.width, e.bottom = e.top + e.height;
}
function dd(e, t) {
	let n = t.safeInsets ?? cd();
	e.safeInsets.top = n.top, e.safeInsets.right = n.right, e.safeInsets.bottom = n.bottom, e.safeInsets.left = n.left;
	let r = t.viewport ?? ld();
	ud(e.viewportFrame, r.left, r.top, r.width, r.height);
	let i = t.safeFrame ?? ld();
	ud(e.safeFrame, i.left, i.top, i.width, i.height), e.compact = e.safeFrame.width <= sd;
}
async function fd(e) {
	let t = /* @__PURE__ */ Ft({
		compact: !1,
		safeInsets: cd(),
		viewportFrame: ld(),
		safeFrame: ld()
	}), n = null, r = !1, i = () => {
		if (r) throw Error("Layout store is disposed.");
		dd(t, e.snapshot());
	};
	return i(), n = await e.subscribe((e) => {
		r || dd(t, e);
	}), {
		state: t,
		refresh: i,
		async dispose() {
			r = !0, await n?.();
		}
	};
}
//#endregion
//#region src/app/create-creator-app.ts
async function pd(e, t = {}) {
	let n = t.settings ?? ad(), r = t.i18n ?? Oc();
	if (!e.api.layout) throw Error("Host layout API is unavailable.");
	let i = await fd(e.api.layout), a = od(), o = {
		host: e,
		settings: n,
		shell: ed(n, a),
		layout: i,
		bubbleBus: a,
		i18n: r
	}, s = $u(o);
	return await s.activateEnabledFeatures(), {
		...o,
		registry: s
	};
}
//#endregion
//#region src/host/api.ts
function md() {
	return window.__TAURITAVERN__?.api ?? null;
}
async function hd() {
	let e = window.__TAURITAVERN__?.ready ?? window.__TAURITAVERN_MAIN_READY__;
	e && await e;
}
//#endregion
//#region src/host/client.ts
function gd(e) {
	let t = /* @__PURE__ */ new Set();
	return e.layout && t.add("layout"), e.chat && t.add("chat"), e.dev?.frontendLogs && t.add("dev.frontendLogs"), e.dev?.backendLogs && t.add("dev.backendLogs"), e.dev?.llmApiLogs && t.add("dev.llmApiLogs"), e.worldInfo && t.add("worldInfo"), t;
}
function _d(e = md()) {
	if (!e) throw Error("TauriTavern host API is unavailable.");
	let t = gd(e);
	return {
		api: e,
		capabilities: t,
		supports(e) {
			return t.has(e);
		},
		supportsAll(e) {
			return e.every((e) => t.has(e));
		},
		getChatHandle() {
			if (!e.chat) throw Error("Chat API is unavailable.");
			return e.chat.current.handle();
		},
		getChatWindowInfo() {
			if (!e.chat) throw Error("Chat API is unavailable.");
			return e.chat.current.windowInfo();
		}
	};
}
//#endregion
//#region src/settings-page/ExtensionsPagePanel.vue?vue&type=script&setup=true&lang.ts
var vd = { class: "inline-drawer wide100p ttce-settings-drawer" }, yd = { class: "inline-drawer-content" }, bd = ["data-ttce-appearance"], xd = /* @__PURE__ */ Is(/* @__PURE__ */ fr({
	__name: "ExtensionsPagePanel",
	props: {
		settings: {},
		features: {},
		setFeatureEnabled: { type: Function }
	},
	setup(e) {
		let t = e, n = Oc(), r = n.t.bind(n), i = Z(() => t.features.map((e) => ({
			id: e.id,
			area: e.area,
			titleKey: e.titleKey,
			descriptionKey: e.descriptionKey,
			enabled: t.settings.isFeatureEnabled(e.id, e.defaultEnabled)
		}))), a = (e) => {
			t.settings.setEnabled(e);
		}, o = (e) => {
			t.settings.setAppearanceMode(e);
		}, s = async ({ id: e, enabled: n }) => {
			await t.setFeatureEnabled(e, n);
		};
		return (e, c) => (G(), K("div", vd, [c[1] ||= q("div", { class: "inline-drawer-toggle inline-drawer-header" }, [q("div", { class: "ttce-settings-header" }, [q("i", { class: "fa-solid fa-code" }), q("b", null, "TauriTavern Creator Extension")]), q("div", { class: "inline-drawer-icon fa-solid fa-circle-chevron-down down" })], -1), q("div", yd, [q("div", {
			class: "ttce-theme-root ttce-settings-surface",
			"data-ttce-appearance": t.settings.state.appearanceMode
		}, [J(ic, {
			title: I(r)("settings.title"),
			description: I(r)("settings.description"),
			"extension-enabled": t.settings.state.enabled,
			"appearance-mode": t.settings.state.appearanceMode,
			features: i.value,
			i18n: I(n),
			onToggleExtension: a,
			onSetAppearance: o,
			onToggleFeature: c[0] ||= (e) => void s(e)
		}, null, 8, [
			"title",
			"description",
			"extension-enabled",
			"appearance-mode",
			"features",
			"i18n"
		])], 8, bd)])]));
	}
}), [["__scopeId", "data-v-254ee4fb"]]), Sd = "tauritavern-creator-extension-root", Cd = "tauritavern-creator-extension-settings-root", wd = "ttce-theme-root", Td = null, Ed = null, Dd = null, Od = null, kd = null, Ad = null, $ = null, jd = null, Md = [], Nd = null, Pd = Promise.resolve();
function Fd() {
	return document.readyState === "loading" ? new Promise((e) => {
		document.addEventListener("DOMContentLoaded", () => e(), { once: !0 });
	}) : Promise.resolve();
}
function Id(e, t, n) {
	document.getElementById(e)?.remove();
	let r = document.createElement("div");
	return r.id = e, r.className = n, t.appendChild(r), r;
}
function Ld() {
	return document.getElementById("extensions_settings2") ?? document.getElementById("extensions_settings");
}
function Rd() {
	!Ed || !$ || (Ed.dataset.ttceAppearance = $.state.appearanceMode);
}
async function zd() {
	if (Td || !Ad || !$ || !$.state.enabled) return;
	let e = await pd(Ad, {
		settings: $,
		i18n: jd
	});
	if (!$.state.enabled) {
		try {
			await e.registry.deactivateAllFeatures();
		} finally {
			await e.layout.dispose();
		}
		return;
	}
	kd = e, Ed = Id(Sd, document.body, wd), Rd(), Td = ys(yc), Td.provide(Ss, e), Td.provide(kc, e.i18n), Td.mount(Ed);
}
async function Bd() {
	let e = kd;
	if (kd = null, e) try {
		await e.registry.deactivateAllFeatures();
	} finally {
		await e.layout.dispose();
	}
	Td?.unmount(), Td = null, Ed?.remove(), Ed = null;
}
async function Vd() {
	if ($) {
		if ($.state.enabled) {
			await zd(), Rd();
			return;
		}
		await Bd();
	}
}
function Hd() {
	return Pd = Pd.catch((e) => {
		console.error("[TauriTavern Creator Extension] Runtime lifecycle sync failed.", e);
	}).then(() => Vd()), Pd;
}
function Ud() {
	if (Dd || !$) return;
	let e = Ld();
	if (!e) {
		console.warn("[TauriTavern Creator Extension] Extensions settings container is unavailable.");
		return;
	}
	Od = Id(Cd, e, "extension_container");
	let t = jd ?? Oc();
	Dd = ys(xd, {
		settings: $,
		features: Md,
		setFeatureEnabled: async (e, t) => {
			if (kd) {
				await kd.registry.setFeatureEnabled(e, t);
				return;
			}
			$?.setFeatureEnabled(e, t);
		}
	}), Dd.provide(kc, t), Dd.mount(Od);
}
function Wd() {
	Dd?.unmount(), Dd = null, Od?.remove(), Od = null;
}
function Gd() {
	Nd?.(), Nd = null, Pd.finally(() => {
		Bd(), Wd();
	});
}
async function Kd() {
	await Fd(), await hd();
	let e = md();
	if (!e) {
		console.error("[TauriTavern Creator Extension] Host API is unavailable.");
		return;
	}
	Ad = _d(e), $ = ad(), jd = Oc(), Md = Qu(Ad), Ud(), Nd = $.subscribe(() => {
		Hd();
	}), await Hd(), window.addEventListener("pagehide", Gd, { once: !0 });
}
Kd();
//#endregion

//# sourceMappingURL=index.js.map