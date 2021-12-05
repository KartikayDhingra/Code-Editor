const defaultCode = {};

defaultCode.clike = `#include<stdio>
#include<iostream>

using namespace std;

int main(){
    cout<<"Hello world";
    return 0;
}
`

defaultCode.java = `public class Default{
    public static void main(String[] args){
        System.out.println("Hello world");
    }
}`

defaultCode.javascript = `console.log("Hello world")`;

defaultCode.python = `print("Hello world")`

defaultCode.go = `package main

import "fmt"

func main() {
	fmt.Println("Hello")
}
`

export default defaultCode;