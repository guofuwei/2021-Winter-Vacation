#include <iostream>
#include <string>

using namespace std;

int main()
{
    string str("Hello World");
    for (string::iterator it = str.begin(); it != str.end(); it++)
    {
        cout << *it << endl;
    }
    for (string::const_iterator it2 = str.begin(); it2 != str.end(); it2++)
    {
        cout << *it2 << endl;
    }
    system("pause");
    return 0;
}