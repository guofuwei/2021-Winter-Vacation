int *buildNext(char *P)
{
	int len=strlen(P),j=0; // 主串
	int *Next=new int[len]; // Next数组
	int t=Next[0]=-1;
	for(j<len-1)
	{
		if(t<0||P[j]==P[t])
		{
			j++;t++;
			Next[j]=t;
		}
		else
		{
			t=Next[t];
		}
	}
}



int KMPmatch(char *S,char *P)
{
	int* Next=buildNext(P);
	int Slen=strlen(S);
	int Plen=strlen(P);
	int i=0,j=0;
	while(i<Slen&&j<Plen)
	{
		if(j<0||S[i]==P[j])
		{
			i++;
			j++;
		}
		else
		{
			j=Next(j);
		}
	}
	delete []Next;
	return i-j;
}


class KMPSolution
{
public:
    int strStr(string haystack, string needle)
    {
        if (needle.size() == 0 || needle.size() > haystack.size())
        {
            return 0;
        }
        vector<int> Next = buildNext(needle);
        int Hlen = haystack.size();
        int Nlen = needle.size();
        int i = 0, j = 0;
        while (i < Hlen && j < Nlen)
        {
            if (j < 0 || haystack[i] == needle[j])
            {
                i++;
                j++;
            }
            else
            {
                j = Next[j];
            }
        }
        if (j != needle.size())
        {
            return -1;
        }
        return i - j;
    }

    vector<int> buildNext(const string &needle)
    {
        const int len = needle.size();
        vector<int> Next(len);
        int j = 0;
        int t = Next[0] = -1;
        while (j < len - 1)
        {
            if (t < 0 || needle[j] == needle[t])
            {
                t++;
                j++;
                Next[j] = t;
            }
            else
            {
                t = Next[t];
            }
        }
        return Next;
    }
};