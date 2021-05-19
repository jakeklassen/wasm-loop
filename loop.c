void loop()
{
  enum
  {
    SIZE = 1000000
  };

  int nums[SIZE] = {0};

  for (int i = 0; i < SIZE; ++i)
  {
    nums[i] = i * 2;
  }
}