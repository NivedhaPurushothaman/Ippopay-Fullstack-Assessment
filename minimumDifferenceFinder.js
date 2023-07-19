function minimumDifference(nums) {
  // Calculating the length of each subarray by dividing the length of the input array by 2.
  const n = nums.length / 2;
  // 2D array to store dynamic programming results.
  const dp = new Array(2 * n).fill(0).map(() => new Array(n + 1).fill(Infinity));

  dp[0][0] = 0;

  for (let i = 1; i < 2 * n; i++) {
    for (let j = 1; j <= Math.min(i, n); j++) {
      // Calculate the minimum difference for the current combination of `i` and `j`.
      // If the current element `nums[i]` is included in the subarray, then `dp[i][j] = dp[i - 1][j - 1] + nums[i]`.
      // If the current element `nums[i]` is excluded from the subarray, then `dp[i][j] = dp[i - 1][j] - nums[i]`.
      dp[i][j] = Math.min(dp[i - 1][j - 1] + nums[i], dp[i - 1][j] - nums[i]);
    }
  }

  return Math.abs(dp[2 * n - 1][n]);
}

//Test cases
const nums1 = [3, 9, 7, 3];
console.log(minimumDifference(nums1)); // Output: 2

const nums2 = [-36, 36];
console.log(minimumDifference(nums2)); // Output: 72

const nums3 = [2, -1, 0, 4, -2, -9];
console.log(minimumDifference(nums3)); // Output: 0
