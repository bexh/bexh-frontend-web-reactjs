import heapq


class User:
    def __init__(self, username):
        self.username = username


class Bet:
    def __init__(self, amount, odds, bet_type, user):
        self.amount = amount
        self.odds = odds
        # bet_type can be "back" or "lay"
        self.bet_type = bet_type
        self.user = user

    def __lt__(self, other):
        assert(self.bet_type == other.bet_type)
        if self.bet_type == "back":
            return True if self.odds > other.odds else False
        if self.bet_type == "lay":
            return True if self.odds < other.odds else False

    def __gt__(self, other):
        assert (self.bet_type == other.bet_type)
        if self.bet_type == "back":
            return True if self.odds > other.odds else False
        if self.bet_type == "lay":
            return True if self.odds < other.odds else False

    def __eq__(self, other):
        return True if self.odds == other.odds else False

    def describe_bet(self):
        print(f"Bet: BetType={self.bet_type} User={self.user.username} Amount={self.amount} Odds={self.odds}")


class GameMarket:
    def __init__(self, description):
        self.description = description
        self._backs = []
        self._lays = []

    def make_bet(self, bet):
        bet.describe_bet()
        if bet.bet_type == "back":
            lay_market_bet = next(iter(self._lays), None)
            while(lay_market_bet and lay_market_bet.amount > 0 and bet.amount > 0 and bet.odds >= lay_market_bet.odds):
                back_market_bet_cost = round(min(bet.amount, lay_market_bet.amount * lay_market_bet.odds), 2)
                lay_market_bet_cost = round(back_market_bet_cost / lay_market_bet.odds, 2)
                executed_odds = lay_market_bet.odds
                self._describe_executed_bet(user1=bet.user,
                                            user2=lay_market_bet.user,
                                            amt1=back_market_bet_cost,
                                            amt2=lay_market_bet_cost,
                                            odds=executed_odds,
                                            bet_type=bet.bet_type)
                bet.amount = round(bet.amount - back_market_bet_cost, 2)
                lay_market_bet.amount = round(lay_market_bet.amount - lay_market_bet_cost, 2)
                if lay_market_bet.amount == 0:
                    heapq.heappop(self._lays)
                    lay_market_bet = next(iter(self._lays), None)
            if bet.amount > 0:
                heapq.heappush(self._backs, bet)

        elif bet.bet_type == "lay":
            back_market_bet = next(iter(self._backs), None)
            while(back_market_bet and back_market_bet.amount > 0 and bet.amount > 0 and bet.odds <= back_market_bet.odds):
                back_market_bet_cost = round(min(back_market_bet.amount, bet.amount * back_market_bet.odds), 2)
                lay_market_bet_cost = round(back_market_bet_cost / back_market_bet.odds, 2)
                executed_odds = back_market_bet.odds
                self._describe_executed_bet(user1=bet.user,
                                            user2=back_market_bet.user,
                                            amt1=lay_market_bet_cost,
                                            amt2=back_market_bet_cost,
                                            odds=executed_odds,
                                            bet_type=bet.bet_type)
                bet.amount = round(bet.amount - lay_market_bet_cost, 2)
                back_market_bet.amount = round(back_market_bet.amount - back_market_bet_cost, 2)
                if back_market_bet.amount == 0:
                    heapq.heappop(self._backs)
                    back_market_bet = next(iter(self._backs), None)
            if bet.amount > 0:
                heapq.heappush(self._lays, bet)

        self._describe_market()

    def _describe_executed_bet(self, user1, user2, amt1, amt2, odds, bet_type):
        print((f"BetExecuted: Type={bet_type} User1={user1.username} "
               f"User2={user2.username} BetAmount1={amt1} "
               f"BetAmount2={amt2} Odds={odds}"))

    def _describe_market(self):
        print("Market Description:")
        message = "Backs:" if self._backs else "No Backs Available"
        print(message)
        for bet in self._backs:
            bet.describe_bet()
        message = "Lays:" if self._lays else "No Lays Available"
        print(message)
        for bet in self._lays:
            bet.describe_bet()
        print("-----------------------------")


if __name__ == "__main__":
    game_market = GameMarket(description="Game1")
    user1 = User(username="Bob")
    user2 = User(username="Charles")
    bets = [
        Bet(amount=1, odds=4, bet_type="lay", user=user1),
        Bet(amount=1, odds=3.5, bet_type="lay", user=user1),
        Bet(amount=1, odds=3, bet_type="lay", user=user1),
        Bet(amount=1, odds=3, bet_type="back", user=user2),
        Bet(amount=2, odds=2, bet_type="back", user=user2),
        Bet(amount=4, odds=4, bet_type="back", user=user2),
        ]
    for bet in bets:
        game_market.make_bet(bet=bet)
