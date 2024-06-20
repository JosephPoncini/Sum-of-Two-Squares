export function twoSquares(n) {

    if(n == 0){
        return [[0, 0]]
    }else if( n == 1){
        return [[0, 1]]
    }

    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }

    function pollardsRho(n) {
        if (n % 2 === 0) return 2;

        const f = (x, c) => (x * x + c) % n;

        let x = 2;
        let y = 2;
        let d = 1;
        let c = -1; // Constant used in the function f

        while (d === 1) {
            x = f(x, c);
            y = f(f(y, c), c);
            d = gcd(Math.abs(x - y), n);
        }

        if (d === n) {
            x = 2;
            y = 2;
            d = 1;
            c = 1; // Constant used in the function f

            while (d === 1) {
                x = f(x, c);
                y = f(f(y, c), c);
                d = gcd(Math.abs(x - y), n);
            }
        }

        if (d === n) return null; // Failure
        return d;
    }

    function primeFactors(n) {
        const factors = [];

        const findFactors = (n) => {
            if (n <= 1) return;
            if (n <= 3) {
                factors.push(n);
                return;
            }

            const factor = pollardsRho(n);
            if (factor === null) {
                factors.push(n);
                return;
            }

            findFactors(factor);
            findFactors(n / factor);
        };

        findFactors(n);
        return factors.sort((a, b) => (a > b ? 1 : -1));
    }

    function bigintSqrt(value) {
        if (value < 0) {
            throw 'Square root of negative numbers is not supported';
        }
        if (value < 2) {
            return { sqrt: value, hasNoDecimals: true };
        }

        function newtonIteration(n, x0) {
            const x1 = (n / x0 + x0) >> 1;
            if (x0 === x1 || x0 === (x1 - 1)) {
                return x0;
            }
            return newtonIteration(n, x1);
        }

        let sqrt = newtonIteration(value, 1);
        let hasNoDecimals = (sqrt * sqrt === value);

        if (!hasNoDecimals) {
            sqrt++;
        }

        return { sqrt, hasNoDecimals };
    }

    function modExp(base, exp, mod) {
        let result = 1;
        base = base % mod;

        while (exp > 0) {
            if (exp % 2 === 1) { // If exp is odd, multiply the base with result
                result = (result * base) % mod;
            }
            exp = exp >> 1; // Divide the exponent by 2
            base = (base * base) % mod; // Square the base
        }

        return result;
    }

    function gcd_modified(a, b, c) {
        let trigger1 = false;
        let trigger2 = false;

        let s1, s2;

        if (b < c && !trigger1) {
            trigger1 = true;
            s1 = b;
        }

        while (!trigger2) {
            [a, b] = [b, a % b];
            if (trigger1) {
                trigger2 = true;
                s2 = b;
            }
            if (b < c && !trigger1) {
                trigger1 = true;
                s1 = b;
            }
        }
        return [s1, s2];
    }

    function getQuadraticNonResidue(p) {
        let base = 1;
        while (!testBase(base, p)) {
            base++;
        }
        return base;
    }

    function testBase(base, p) {
        for (let i = 0; i < base; i++) {
            if (p % base == (i * i) % base) {
                return false;
            }
        }
        return true;
    }

    function getSquareSums(p) {
        const base = getQuadraticNonResidue(p);
        const k = (p - 1) / 4;
        const x = modExp(base, k, p)
        const sqrt = bigintSqrt(p).sqrt;
        const [s1, s2] = gcd_modified(p, x, sqrt)
        return [s1, s2];
    }

    function shortenPrimes(primes) {
        let currentPrime = primes[0]
        let reducedPrimes = [primes[0]];
        let exponenets = [];
        let counter = 1;

        for (let i = 1; i < primes.length; i++) {
            if (primes[i] != currentPrime) {
                currentPrime = primes[i];
                reducedPrimes.push(currentPrime)
                exponenets.push(counter);
                counter = 1;
            } else {
                counter++;
            }
        }

        exponenets.push(counter);

        return { reducedPrimes, exponenets }
    }

    function Brahmagupta(sums1, sums2) {
        const opt1 = [sums1[0] * sums2[0] + sums1[1] * sums2[1], Math.abs(sums1[0] * sums2[1] - sums1[1] * sums2[0])]
        const opt2 = [Math.abs(sums1[0] * sums2[0] - sums1[1] * sums2[1]), sums1[0] * sums2[1] + sums1[1] * sums2[0]]
        return { opt1, opt2 }
    }

    function bigIntPow(base, exponent) {
        if (exponent < 0) {
            throw new Error("Exponent must be a non-negative integer.");
        }
        let result = 1;

        while (exponent > 0) {
            if (exponent % 2 === 1) {
                result *= base;
            }
            base *= base;
            exponent = Math.floor(exponent / 2);
        }

        return result;
    }

    function findMaxSum(arrArr) {
        let maxSum = 0;
        let maxSquares = arrArr[0];

        for (let i = 0; i < arrArr.length; i++) {
            let sum = arrArr[i][0] + arrArr[i][1];

            if (sum > maxSum) {
                maxSum = sum;
                maxSquares = arrArr[i];
            }
        }

        return { maxSum, maxSquares }
    }

    function getSumOfMaxSquaredSums(n) {
        const primes = primeFactors(n);
        const { reducedPrimes, exponenets } = shortenPrimes(primes);
        const squaredSumsArr = [];

        for (let i = 0; i < reducedPrimes.length; i++) {
            if ((reducedPrimes[i] % 4 === 3) && (exponenets[i] % 2 === 1)) {
                return [];
            }
        }

        for (let i = 0; i < reducedPrimes.length; i++) {
            if (reducedPrimes[i] == 2) {
                for (let j = 0; j < exponenets[i]; j++) {
                    squaredSumsArr.push([1, 1])
                }
            }
            if (reducedPrimes[i] % 4 === 1) {
                for (let j = 0; j < exponenets[i]; j++) {
                    squaredSumsArr.push(getSquareSums(reducedPrimes[i]))
                }
            }
            if (reducedPrimes[i] % 4 === 3) {
                squaredSumsArr.push([0, bigIntPow(reducedPrimes[i], exponenets[i] / 2)])
            }
        }

        let level = [squaredSumsArr[0]];
        let squares = [level];
        for (let k = 0; k < squaredSumsArr.length - 1; k++) {
            let opts = Brahmagupta(squares[k][0], squaredSumsArr[k + 1]);
            level = [opts.opt1, opts.opt2];
            for (let kk = 1; kk < squares[k].length; kk++) {
                opts = Brahmagupta(squares[k][kk], squaredSumsArr[k + 1]);
                level.push(opts.opt1);
                level.push(opts.opt2);
            }
            squares.push(level);
        }

        let max = findMaxSum(level);

        // console.log(level)

        return removeIdenticalArrays(level);
    }

    function removeIdenticalArrays(arr) {
        const uniqueArrays = [];
        const uniqueMap = new Map();
    
        for (const subArr of arr) {
            const sortedArr = [...subArr].sort((a, b) => a - b);
            const key = sortedArr.join(',');
            if (!uniqueMap.has(key)) {
                uniqueArrays.push(subArr);
                uniqueMap.set(key, true);
            }
        }
    
        return uniqueArrays;
    }

    return getSumOfMaxSquaredSums(n)
}
