using System;
using labo.signalr.api.Data;
using labo.signalr.api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;

namespace labo.signalr.api.TaskHub
{
    public class TaskHub : Hub
    {
        private readonly ApplicationDbContext _context;

        // Classe statique pour garder les connexions actives
        public static class UserHandler
        {
            // Liste des IDs de connexion des utilisateurs connectés
            public static HashSet<string> ConnectedIds = new HashSet<string>();
        }
        public TaskHub(ApplicationDbContext context)
        {
            _context = context;
        }
        public override async Task OnConnectedAsync()
        {
            // Appel de la méthode de base (obligatoire)
            await base.OnConnectedAsync();

            // Ajouter l'utilisateur dans la liste
            UserHandler.ConnectedIds.Add(Context.ConnectionId);

            // Envoyer le nombre d'utilisateurs à TOUS les clients
            await Clients.All.SendAsync("UserCount", UserHandler.ConnectedIds.Count);

            // Envoyer la liste des tâches seulement au client qui vient de se connecter
            await Clients.Caller.SendAsync("TaskList", _context.UselessTasks.ToList());
        }

        public async Task AddTask(string task)
        {
            // Créer une nouvelle tâche
            _context.UselessTasks.Add(
                new UselessTask() 
                {

                Text = task 

                });

            // Sauvegarder en BD
            _context.SaveChanges();

            // Envoyer la nouvelle liste à TOUS les clients
            await Clients.All.SendAsync("TaskList", _context.UselessTasks.ToList());
        }

        public async Task CompleteTask(int taskid)
        {
            // Trouver la tâche correspondante
            var task = _context.UselessTasks.Single(t => t.Id == taskid);

            // Marquer comme complétée
            task.Completed = true;

            // Sauvegarder en BD
            _context.SaveChanges();

            // Envoyer la nouvelle liste à TOUS les clients
            await Clients.All.SendAsync("TaskList", _context.UselessTasks.ToList());
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Retirer l'utilisateur de la liste
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);

            // Envoyer le nouveau nombre d'utilisateurs à TOUS
            await Clients.All.SendAsync("UserCount", UserHandler.ConnectedIds.Count);

            // Appel de la méthode de base
            await base.OnDisconnectedAsync(exception);
        }

    }
}
