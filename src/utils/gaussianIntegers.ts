// ガウス整数を表すクラス
class GaussianInteger {
    constructor(public real: number, public imag: number) {}

    // ノルムを計算
    norm(): number {
        return this.real * this.real + this.imag * this.imag;
    }

    // 共役を返す
    conjugate(): GaussianInteger {
        return new GaussianInteger(this.real, -this.imag);
    }

    // LaTeX形式の文字列表現を返す
    toString(): string {
        if (this.real === 0 && this.imag === 0) return "0";
        if (this.real === 0) {
            if (this.imag === 1) return "i";
            if (this.imag === -1) return "-i";
            return `${this.imag}i`;
        }
        if (this.imag === 0) return `${this.real}`;
        
        // 実部と虚部を持つ場合は括弧で囲む
        if (this.imag === 1) return `(${this.real} + i)`;
        if (this.imag === -1) return `(${this.real} - i)`;
        return `(${this.real} ${this.imag > 0 ? '+' : '-'} ${Math.abs(this.imag)}i)`;
    }
}

// 最大公約数を計算（ユークリッドの互除法）
function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

// 素数判定
function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// ガウス素数判定
function isGaussianPrime(g: GaussianInteger): boolean {
    const norm = g.norm();
    
    // ケース1: a + 0i の場合
    if (g.imag === 0) {
        return isPrime(Math.abs(g.real)) && Math.abs(g.real) % 4 === 3;
    }
    
    // ケース2: 0 + bi の場合
    if (g.real === 0) {
        return isPrime(Math.abs(g.imag)) && Math.abs(g.imag) % 4 === 3;
    }
    
    // ケース3: a + bi の場合
    return isPrime(norm);
}

// 素因数の出現回数をカウントして指数表記に変換する関数
function compressFactors(factors: string[]): string[] {
    const count = new Map<string, number>();
    
    // 各因数の出現回数をカウント
    for (const factor of factors) {
        count.set(factor, (count.get(factor) || 0) + 1);
    }

    // 指数表記に変換
    return Array.from(count.entries()).map(([factor, power]) => {
        if (power === 1) return factor;
        return `${factor}^${power}`;
    });
}

// 与えられた整数をガウス整数として素因数分解
export function factorizeGaussianInteger(n: number): string[] {
    // 整数以外の入力をチェック
    if (!Number.isInteger(n)) {
        throw new Error('整数を入力してください');
    }

    if (n === 0) return ["0"];
    if (n === 1) return ["1"];
    
    const factors: GaussianInteger[] = [];
    let remaining = Math.abs(n);

    // 負の数の処理（-1の代わりにi^2を使用）
    if (n < 0) {
        factors.push(new GaussianInteger(0, 1));
        factors.push(new GaussianInteger(0, 1));
    }

    // 2の因子を処理
    while (remaining % 2 === 0) {
        factors.push(new GaussianInteger(1, 1));
        factors.push(new GaussianInteger(1, -1));
        remaining /= 2;
    }

    // 残りの素因数を処理
    for (let p = 3; p * p <= remaining; p += 2) {
        while (remaining % p === 0) {
            if (p % 4 === 3) {
                factors.push(new GaussianInteger(p, 0));
            } else if (p % 4 === 1) {
                // p = a² + b² となる a, b を見つける
                let a = Math.floor(Math.sqrt(p));
                while (a > 0) {
                    const b2 = p - a * a;
                    const b = Math.floor(Math.sqrt(b2));
                    if (b * b === b2) {
                        factors.push(new GaussianInteger(a, b));
                        factors.push(new GaussianInteger(a, -b));
                        break;
                    }
                    a--;
                }
            }
            remaining /= p;
        }
    }

    // 残りの数が素数の場合
    if (remaining > 1) {
        if (remaining % 4 === 3) {
            factors.push(new GaussianInteger(remaining, 0));
        } else if (remaining % 4 === 1) {
            let a = Math.floor(Math.sqrt(remaining));
            while (a > 0) {
                const b2 = remaining - a * a;
                const b = Math.floor(Math.sqrt(b2));
                if (b * b === b2) {
                    factors.push(new GaussianInteger(a, b));
                    factors.push(new GaussianInteger(a, -b));
                    break;
                }
                a--;
            }
        }
    }

    const result = factors.map(f => f.toString());
    
    // 結果を指数表記に変換して返す
    return compressFactors(result);
} 