#include <iostream>
#include <fstream>
#include <vector>
using namespace std;

void SplitString(const std::string &s, std::vector<std::string> &v, const std::string &c)
{
    std::string::size_type pos1, pos2;
    pos2 = s.find(c);
    pos1 = 0;
    while (std::string::npos != pos2)
    {
        v.push_back(s.substr(pos1, pos2 - pos1));

        pos1 = pos2 + c.size();
        pos2 = s.find(c, pos1);
    }
    if (pos1 != s.length())
        v.push_back(s.substr(pos1));
}
int main()
{
    vector<string> sub_str;
    SplitString("4,-7,-3,#,#,-9,-3,9,-7,-4,#,6,#,-6,-6,#,#,0,6,5,#,9,#,#,-1,-4,#,#,#,-2,#,#,#,#,#,#,#,", sub_str, ",");
    for (auto one : sub_str)
    {
        cout << one << endl;
    }
    cout << sub_str[sub_str.size() - 1] << endl;
    system("pause");
    return 0;
}
