class Progress
{
    initial_progres = [
        {completed: false, coins: 0},
        {completed: false, coins: 0},
        {completed: false, coins: 0},
    ];

    constructor()
    {
        if(localStorage.getItem('game_progress') == null)
        {
            localStorage.setItem('game_progress', JSON.stringify(this.initial_progres));
        }
    }

    completeLevel(level_index, coins)
    {
        let current_progress = localStorage.getItem('game_progress');
        current_progress = JSON.parse(current_progress);

        current_progress[level_index].completed = true;
        current_progress[level_index].coins += coins;

        localStorage.setItem('game_progress', JSON.stringify(current_progress));
    }

    levelCompleted(level_index)
    {
        let current_progress = localStorage.getItem('game_progress');
        current_progress = JSON.parse(current_progress);

        return current_progress[level_index].completed;
    }

    getTotalCoins()
    {
        let result = 0;

        let current_progress = localStorage.getItem('game_progress');
        JSON.parse(current_progress).forEach(function(level_progress) {result += level_progress.coins });

        return result;
    }
}