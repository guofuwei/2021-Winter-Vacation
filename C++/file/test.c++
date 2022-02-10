#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    fstream myFile("test.txt");
    string myText;
    while (getline(myFile, myText))
    {
        cout << myText;
    }
    system("pause");
    return 0;
}

void exceptionTest()
{
    try
    {
        int *age = NULL;
    }
    catch (...)
    {
        cout << "This is a err\n";
    }
}