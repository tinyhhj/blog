---
title: "[gcj2019-qr3]Cryptopangrams"
date: "2020-01-13T17:32:51.915Z"
description: "algorithm"
---

# [Cryptopangrams](https://codingcompetitions.withgoogle.com/codejam/round/0000000000051705/000000000008830b)

## gcd(최대 공약수)

이 문제를 해결하는데 엄청나게 시간을 낭비했다.

풀이 1: 인접한 두 수의 최대 공약수 구하기(a _ b = c, b _ d = e 일때 c,e 의 최대 공약수는 b이다.)

접근 1으로 풀었을 때, 이 문제의 함정을 조심해야한다.

접근 2: 풀이 1로만 접근했을 때에는 ABABABB 와 BABABAA 를 판별하지 못한다. 왜냐하면 AB와 BA의 최대 공약수는 자기자신 AB이기 때문이다.
즉, 최대공약수를 통해서 소수를 유추해내려면 적어도 2쌍의 다른 소수의 곱이 필요하다 (예: AB BC => gcd = B로 유추가능, AB BA => gcd AB 유추 불가능)

접근 3: 접근 2까지 했으나 visible set은 통과하나 hidden set은 통과를 못함. 결국 유투브에서 원인을 찾아낼 수 있었음
소수의 크기가 10^100이기때문에 BigInteger를 사용해야만 했는데 시스템 입력에서 읽어올때 **BigInteger.valueOf(sc.nextInt())** 식으로 읽어오고 있던걸 **sc.nextBigInteger()**로 읽어오니까 통과함

```java
package codejam.qr2019.q3;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.*;

public class Solution {

    public static void main(String[] args) throws FileNotFoundException {
        Scanner sc = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int tc = sc.nextInt();
        sc.nextLine();
        for( int i = 0 ; i < tc ; i++ ) {
            SortedSet<BigInteger> primes = new TreeSet<>();
            BigInteger n = sc.nextBigInteger();
            int l = sc.nextInt();
            List<BigInteger> input = new ArrayList<>();
            List<BigInteger> primesOrder = new ArrayList<>();
            BigInteger prev = sc.nextBigInteger();
            int idx = 0;
            for( int j = 1 ; j < l; j++) {
                BigInteger number = sc.nextBigInteger();
                BigInteger prevNumber =prev;
                if( prevNumber.compareTo(number) != 0 ) {
                    BigInteger prime = gcd(number, prevNumber);
                    if( j % 2 != 0) {
                        //BABAA ABABB
                        //BAC
                        // AAAAB
                        BigInteger other = prevNumber.divide(prime);
                        for( int k = 0 ; k <= j ; k++) {
                            primesOrder.add(k %2 == 0 ? other: prime);
                        }
                        primesOrder.add(number.divide(prime));
                    } else {
                        //ABABAA
                        BigInteger other = prevNumber.divide(prime);
                        for( int k = 0 ; k <= j ; k++) {
                            primesOrder.add(k %2 == 0 ? prime: other);
                        }
                        primesOrder.add(number.divide(prime));
                    }
                    idx = j;
                    break;
                }
            }
            for( int j = idx+1; j < l ; j++) {
                // 12 23 34 ..  end-1 end
                BigInteger num = sc.nextBigInteger();
                BigInteger prevNum = primesOrder.get(primesOrder.size()-1);
                BigInteger number = num.divide(prevNum);
                primesOrder.add(number);
            }
//            primesOrder.add(input.get(input.size()-1).divide(primesOrder.get(primesOrder.size()-1)));
            primes.addAll(primesOrder);

//            Assert.check(primes.size() == 26);
//            Assert.check(primes.first().compareTo(primes.last()) < 0);

            Iterator<BigInteger> it = primes.iterator();
            Map<BigInteger, Integer> mapping = new HashMap<>();
            int cnt = 0 ;
            while(it.hasNext()) {
                mapping.put(it.next(), cnt++);
            }
            char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
            System.out.print(String.format("Case #%d: ",i+1));
            for( BigInteger p : primesOrder) {
                System.out.print(alphabet[mapping.get(p)]);
            }
            System.out.println("");

        }


    }

    public static BigInteger gcd(BigInteger a , BigInteger b) {
        if( a.compareTo(b) < 0) {
            BigInteger tmp = a;
            a = b;
            b = tmp;
        }
        while(b.compareTo(BigInteger.ZERO) != 0) {
            BigInteger r = a.mod(b);
            a = b;
            b = r;
        }
        return a;
    }
}

```
