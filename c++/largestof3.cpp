#include <iostream>
using namespace std;
int main(){
int num1,num2,num3;
//intput
cout<<"Enter the first number";cin>>num1;cout<<endl;
cout<<"Enter the second number";cin>>num2;cout<<endl;
cout<<"Enter the third number";cin>>num3;cout<<endl;

//find largest
if (num1>num2 && num1>num3)
{
    cout<<"The first number is gratest whitch is = ";cout<<num1;
}
 else if(num2>num1 && num2>num3)
{
    cout<<"The second number is gratest whitch is = ";cout<<num2;
}
else if(num3>num2 && num3>num1) 
{
    cout<<"The third number is gratest whitch is = ";cout<<num3;
}
// }
// if (num1 > num2 && num1 > num3) {
//         cout << "The first number is greatest, which is = " << num1;
//     } 
//     else if (num2 > num1 && num2 > num3) {
//         cout << "The second number is greatest, which is = " << num2;
//     } 
//     else {  // This handles the case where num3 is the greatest
//         cout << "The third number is greatest, which is = " << num3;
//     }
return 0;
}