#include <iostream>
using namespace std;
int main()
{
    int Total;
    float math, english, fos, cpp, java;
    //float=0.0;
    cout << "\nEnter the marks of math=";
    cin >> math;
    cout << "\nEnter the marks of english=";
    cin >> english;
    cout << "\nEnter the marks of fos=";
    cin >> fos;
    cout << "\nEnter the marks of cpp=";
    cin >> cpp;
    cout << "\nEnter the marks of java=";
    cin >> java;
    Total = math + english + fos + cpp + java;
    cout << "The total marks=";
    cout << Total;
    cout << "/500";

    return 0;
}