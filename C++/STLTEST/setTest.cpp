#include <iostream>
#include <set>
#include <string>
#include <unordered_set>

using namespace std;

template <typename T>
void showset(set<T> v)
{
    for (auto it = v.begin(); it != v.end(); it++)
    {
        cout << *it;
    }
    cout << endl;
}

int main()
{
    set<int> s1{9, 8, 1, 2, 3, 4, 5, 5, 5, 6, 7, 7}; //自动排序，从小到大,剔除相同项
    set<pair<int, int>> s3;
    showset(s1);
    set<string> s2{"hello", "sysy", "school", "hello"}; //字典序排序
    showset(s2);
    s1.insert(9); //有这个值了，do nothing
    showset(s1);
    s1.count(9);
#if 0
    s2.insert("aaa"); //没有这个字符串，添加并且排序
    showset(s2);
#endif

    system("pause");
    return 0;
}
