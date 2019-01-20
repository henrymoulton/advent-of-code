/**
 * Original by [Petka Antonov](https://github.com/petkaantonov/deque/blob/master/js/deque.js)
 */
export class Deque<T> extends Array<T> {
	static MAX_CAPACITY: number = (1 << 30) | 0;
	static MIN_CAPACITY: number = 16;

	_capacity: number;
	_length: number;
	_front: number;

	constructor(capacity: number = Deque.MAX_CAPACITY, ...arr: T[]) {
		super(...arr);
		this._capacity = Deque.getCapacity(capacity);
		this._length = 0;
		this._front = 0;
		if (Array.isArray(capacity)) {
			const len = capacity.length;
			for (let i = 0; i < len; ++i) {
				this[i] = capacity[i];
			}
			this._length = len;
		}
	}

	rotate(n: number): void {
		for (let i = 0; i < Math.abs(n); i++) {
			if (n < 0) {
				this.push(this.shift());
			} else {
				this.unshift(this.pop());
			}
		}
	}

	toArray(): Array<T> {
		const ret = new Array<T>(this._length);
		for (let j = 0; j < this._length; ++j) {
			ret[j] = this[(this._front + j) & (this._capacity - 1)];
		}
		return ret;
	}

	push(item: T): number {
		const argsLength = arguments.length;
		let length = this._length;
		if (argsLength > 1) {
			const capacity = this._capacity;
			if (length + argsLength > capacity) {
				for (var i = 0; i < argsLength; ++i) {
					this._checkCapacity(length + 1);
					var j = (this._front + length) & (this._capacity - 1);
					this[j] = arguments[i];
					length++;
					this._length = length;
				}
				return length;
			} else {
				var j = this._front;
				for (var i = 0; i < argsLength; ++i) {
					this[(j + length) & (capacity - 1)] = arguments[i];
					j++;
				}
				this._length = length + argsLength;
				return length + argsLength;
			}
		}

		if (argsLength === 0) return length;

		this._checkCapacity(length + 1);
		var i = (this._front + length) & (this._capacity - 1);
		this[i] = item;
		this._length = length + 1;
		return length + 1;
	}

	pop(): T {
		const length = this._length;
		if (length === 0) {
			return void 0;
		}
		const i = (this._front + length - 1) & (this._capacity - 1);
		const ret = this[i];
		this[i] = void 0;
		this._length = length - 1;
		return ret;
	}

	shift(): T {
		const length = this._length;
		if (length === 0) {
			return void 0;
		}
		const front = this._front;
		const ret = this[front];
		this[front] = void 0;
		this._front = (front + 1) & (this._capacity - 1);
		this._length = length - 1;
		return ret;
	}

	unshift(item: T): number {
		let length = this._length;
		const argsLength = arguments.length;

		if (argsLength > 1) {
			var capacity = this._capacity;
			if (length + argsLength > capacity) {
				for (var i = argsLength - 1; i >= 0; i--) {
					this._checkCapacity(length + 1);
					var capacity = this._capacity;
					var j = (((this._front - 1) & (capacity - 1)) ^ capacity) - capacity;
					this[j] = arguments[i];
					length++;
					this._length = length;
					this._front = j;
				}
				return length;
			} else {
				let front = this._front;
				for (var i = argsLength - 1; i >= 0; i--) {
					var j = (((front - 1) & (capacity - 1)) ^ capacity) - capacity;
					this[j] = arguments[i];
					front = j;
				}
				this._front = front;
				this._length = length + argsLength;
				return length + argsLength;
			}
		}

		if (argsLength === 0) return length;

		this._checkCapacity(length + 1);
		var capacity = this._capacity;
		var i = (((this._front - 1) & (capacity - 1)) ^ capacity) - capacity;
		this[i] = item;
		this._length = length + 1;
		this._front = i;
		return length + 1;
	}

	peekBack(): T {
		const length = this._length;
		if (length === 0) {
			return void 0;
		}
		const index = (this._front + length - 1) & (this._capacity - 1);
		return this[index];
	}

	peekFront(): T {
		if (this._length === 0) {
			return void 0;
		}
		return this[this._front];
	}

	get(index: number): T {
		let i = index;
		if (i !== (i | 0)) {
			return void 0;
		}
		const len = this._length;
		if (i < 0) {
			i = i + len;
		}
		if (i < 0 || i >= len) {
			return void 0;
		}
		return this[(this._front + i) & (this._capacity - 1)];
	}

	isEmpty(): boolean {
		return this._length === 0;
	}

	clear(): void {
		const len = this._length;
		const front = this._front;
		const capacity = this._capacity;
		for (let j = 0; j < len; ++j) {
			this[(front + j) & (capacity - 1)] = void 0;
		}
		this._length = 0;
		this._front = 0;
	}

	toString(): string {
		return this.toArray().toString();
	}

	get length(): number {
		return this._length;
	}

	_checkCapacity(size: number): void {
		if (this._capacity < size) {
			this._resizeTo(Deque.getCapacity(this._capacity * 1.5 + 16));
		}
	}

	_resizeTo(capacity: number): void {
		const oldCapacity = this._capacity;
		this._capacity = capacity;
		const front = this._front;
		const length = this._length;
		if (front + length > oldCapacity) {
			const moveItemsCount = (front + length) & (oldCapacity - 1);
			Deque.arrayMove(this, 0, this, oldCapacity, moveItemsCount);
		}
	}

	static arrayMove<T>(src: Deque<T>, srcIndex: number, dst: Deque<T>, dstIndex: number, len: number): void {
		for (let j = 0; j < len; ++j) {
			dst[j + dstIndex] = src[j + srcIndex];
			src[j + srcIndex] = void 0;
		}
	}

	static pow2AtLeast(n: number): number {
		n = n >>> 0;
		n = n - 1;
		n = n | (n >> 1);
		n = n | (n >> 2);
		n = n | (n >> 4);
		n = n | (n >> 8);
		n = n | (n >> 16);
		return n + 1;
	}

	static getCapacity(capacity: number): number {
		return Deque.pow2AtLeast(Math.min(Math.max(Deque.MIN_CAPACITY, capacity), Deque.MAX_CAPACITY));
	}
}
