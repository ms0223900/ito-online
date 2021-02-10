const gameManual = {
  "zh": `# 遊玩說明
  此遊戲建議「面對面」互動遊玩。
  
  ## 遊戲開始前
  * 在大廳中選擇一個房間加入，或是自己創建房間。
  * 點擊「準備好了」的按鈕，並等待其他人都準備好。
  * 遊戲預設「至少3人」才能遊玩。
  
  ## 遊戲開始
  遊戲主要規則：
  * 最上面為生命值，為同房間的玩家「共同」擁有的，只要生命值歸零，則遊戲結束。
  * 下部分為此回合的「主題題目」與卡片數字。
  * 下一張卡片的數字必須比「上一張還小」，否則「扣1點生命值」，例如此回合出的是13，下回合必須是1~12之間的卡片。
  
  ### 主題題目「估值」階段
  每個玩家要根據該主題，去「估計」自己的卡片數字，想想是符合該主題程度的哪種名詞。
  #### 估值舉例
  * 例如：該主題為「新年時那些令人討厭的事情。（數字越大越令人討厭，反之越小則越令人高興）」，玩家Ａ的卡片數字為10，玩家Ｂ的卡片數字為88。
  * 這時玩家Ａ講出了「拿到1000元的紅包」，而玩家Ｂ則是「發了幾十個親戚的小孩紅包，還不小心將1000元給出去」。
  
  當大家都估計完自己的卡片後，接著就可以進行「出牌」（點擊Play Card按鈕）了。
  
  ### 出牌階段
  * 這時大家要互相討論與猜測每個人的卡片數字大小，根據上一個人出的卡片，應對下一張卡片該如何出牌。每個玩家出自己的卡片，直到「通過此回合」或是「遊戲結束」。
  
  ## 回合結束
  ### 通過此回合
  當每位玩家的卡片都出完，且生命值仍然大於0時，則「通過該回合」，這時各玩家可以選擇「繼續遊戲」或是「離開遊戲」。
  * 繼續遊戲：等所有人都點選了繼續或是離開遊戲之後，選擇繼續遊戲的玩家數量大於等於最低遊玩人數（3人）時，遊戲就會重新開始下一輪。
  * 離開遊戲：直接離開遊戲，並回到大廳。
  
  ### 遊戲結束
  在全部玩家還沒出完各自的牌之前，只要生命值歸零（愛心全沒），則遊戲結束。`,
  "en": ""
};

export default gameManual;