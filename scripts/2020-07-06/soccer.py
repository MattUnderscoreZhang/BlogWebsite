from browser import document, aio
from javascript import Math


def print_game(text):
    game.innerHTML += text
    game.scrollTop = game.scrollHeight


class Player:
    def __init__(self, name):
        self.pass_probs = []
        self.team = None
        self.name = name

    def pass_ball(self):
        pass_prob = Math.random()
        cumulative_prob = 0
        for prob, player in self.pass_probs:
            cumulative_prob += prob
            if pass_prob <= cumulative_prob:
                if player is None:
                    print_game("> " + self.name + " scores!" + "\n")
                else:
                    if self.team == player.team:
                        print_game("> " + self.name + " passes to " + player.name + "\n")
                    else:
                        print_game("> " + self.name + " has been intercepted by " + player.name + "\n")
                return player
        assert(1 == 2)


class Team:
    def __init__(self, name, roster):
        self.name = name
        self.roster = roster
        for player in roster:
            player.team = self
        self.score = 0
        self.other_defender = None

    def score_goal(self):
        self.score += 1

    def has_won(self):
        has_won = self.score >= 10
        if has_won:
            print_game(self.name + " win!\n")
        return has_won


async def play():
    # initialize players
    defender_A = Player("Antonio")
    offender_A = Player("Armando")
    goalie_A = Player("Arsenio")
    defender_B = Player("Broca")
    offender_B = Player("Brando")
    goalie_B = Player("Benicio")

    # set passing probs
    defender_A.pass_probs = [(0.8, offender_A), (0.2, offender_B)]
    offender_A.pass_probs = [(0.5, None), (0.5, goalie_B)]
    goalie_A.pass_probs = [(0.8, defender_A), (0.2, offender_B)]
    defender_B.pass_probs = [(0.75, offender_B), (0.25, offender_A)]
    offender_B.pass_probs = [(0.45, None), (0.55, goalie_A)]
    goalie_B.pass_probs = [(0.75, defender_B), (0.25, offender_A)]
    team_A = Team("Flying Gorillas", [defender_A, offender_A, goalie_A])
    team_B = Team("One Eyed Snakes", [defender_B, offender_B, goalie_B])
    team_A.other_defender = defender_B
    team_B.other_defender = defender_A

    # stupid stuff to say
    def commentate(player):
        sayings = [
            "I haven't seen play this intense since they banned dogs from playing soccer!",
            "This game really makes me glad I have eyeballs!",
            player.team.name + " really making a big comeback from their big doping scandal.",
            player.team.name + " putting in the effort despite having had twelve concussions this season.",
            "Back when my county existed, presidential elections were decided via soccer.",
            "Soccer has really improved since they made the ball spherical instead of rectangular.",
            "Enjoy this game while it lasts! Economists predict all soccer will be played by robots within the next five years.",
            player.name + " using his secret kicking move that has defied physicists for decades.",
            "Don't forget to buy your " + player.team.name + " merch after the game!",
            "What a shameful display. Truly awful soccer playing.",
            "Soccer hasn't been the same since they outlawed strategic groin kicks.",
            "This is the kind of game that ended the Cold War!",
            "Are there games other than soccer? I don't know and I don't want to know.",
            "What are they doing? Oh wait, they're kicking the ball.",
            "This game doesn't have nearly as many fatalities as it used to!",
            "Can you believe " + player.name + " isn't even getting paid for this?",
            player.team.name + " have a lot riding on this game. If they lose, they'll all have their passports revoked.",
            "Oh, there goes a streaker on the field!",
            "My wife left me because I loved soccer too much, but it was worth it!",
            "What would people do without soccer? Probably farm or something.",
            "The referee appears to be taking a nap, but he'll be up soon!",
            "FIFA is considering adding microtransactions to soccer in real life. Exciting!",
            "Soccer is short for 'Association Football'.",
            player.name + " is doing pretty good for his first day on the job!",
            "Fun fact: none of the players present here today actually know all the rules of soccer!",
            "I wonder what's for lunch. Hopefully not sloppy joes again.",
            "I also do announcements for children's birthday parties! Come talk to me after the game!",
            "Looks like they forgot to inflate the ball before the game.",
            "I hope they don't fire me for living in the announcer's booth.",
            "What is soccer? Scientists are *this close* to finding out.",
            player.name + " playing very well for a man with only one leg.",
        ]
        print_game(sayings[Math.floor(Math.random()*len(sayings))] + "\n")

    # play game
    game.innerHTML = ("Game start!\n\n")
    player_with_ball = offender_A
    print_game("> " + player_with_ball.name + " now has the ball\n")
    while True:
        await aio.sleep(Math.random()*2 + 1)  # so you can watch in real time
        current_team = player_with_ball.team
        next_player = player_with_ball.pass_ball()
        if Math.random() < 0.25:
            commentate(player_with_ball)
        player_with_ball = next_player
        if player_with_ball is None:
            current_team.score_goal()
            print_game("The score is now - " + team_A.name + ": " + str(team_A.score) + ", " + team_B.name + ": " + str(team_B.score) + "\n\n")
            if current_team.has_won():
                break
            player_with_ball = current_team.other_defender
            print_game("> " + player_with_ball.name + " now has the ball\n")


def play_game(event):
    aio.run(play())


document["playsoccer"].bind("click", play_game)
game = document["soccergame"]
