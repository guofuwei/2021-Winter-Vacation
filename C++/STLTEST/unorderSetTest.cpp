#include <iostream>
#include <unordered_set>

using namespace std;

int main()
{
	unordered_set<int> c1;
	c1.empty();	   //判断是否为空
	c1.size();	   //获取元素个数
	c1.max_size(); //获取最大存储量
	//查找函数find通过给定主键查找元素
	unordered_set<int>::iterator find_iter = c1.find(1);
	// value出现的次数count返回匹配给定主键元素的个数
	c1.count(1);
	//返回元素在哪个区域equal_range，返回值匹配给定搜索值的元素组成的范围
	pair<unordered_set<int>::iterator, unordered_set<int>::iterator>
		pair_equal_range = c1.equal_range(1);
	//插入函数emplace
	c1.emplace(1);
	//插入函数emplace_hint()使用迭代器
	c1.emplace_hint(ite.begin, 1);
	//插入函数insert
	c1.insert(1);
	//删除erase
	c1.erase(1);
	//清空clear
	c1.clear();
	//交换swap
}