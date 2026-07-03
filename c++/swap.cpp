#include <iostream>
using namespace std;
int temp;
void swap(int *a,int *b){

 temp=*a;
 *a=*b;
 *b=temp;
}
int main(){
int a,b;
cout<<"enter the value of a=";cin>>a;cout<<endl;
cout<<"enter the value of b=";cin>>b;cout<<endl;
swap(&a,&b);
cout<<"the value of a=";cout<<a;cout<<endl;
cout<<"the value of b=";cout<<b;cout<<endl;
return 0;
}

