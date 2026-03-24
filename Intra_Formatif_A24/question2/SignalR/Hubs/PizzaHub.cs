using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();
            await Clients.Caller.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await Clients.Caller.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            // 1. Nom du groupe (pizza)
            var groupname = _pizzaManager.GetGroupName(choice);
            // 2. Ajouter le client au groupe
            await Groups.AddToGroupAsync(Context.ConnectionId, groupname);

            // 3. Envoyer au client le prix de la pizza
            await Clients.Caller.SendAsync("UpdatePizzaPrice", _pizzaManager.PIZZA_PRICES[(int)choice]);

            // 4. Envoyer au groupe les infos (nb pizzas + argent)
            await Clients.Group(groupname).SendAsync("UpdateNbPizzasAndMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            var groupname = _pizzaManager.GetGroupName(choice);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupname);

            await Clients.Caller.SendAsync("UpdatePizzaPrice", 0);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            var groupname = _pizzaManager.GetGroupName(choice);

            _pizzaManager.IncreaseMoney(choice);

            await Clients.Group(groupname).SendAsync("UpdateMoney", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            var groupname = _pizzaManager.GetGroupName(choice);

            _pizzaManager.BuyPizza(choice);

            await Clients.Group(groupname).SendAsync("UpdateNbPizzasAndMoney ", _pizzaManager.NbPizzas[(int)choice], _pizzaManager.Money[(int)choice]);
        }
    }
}
