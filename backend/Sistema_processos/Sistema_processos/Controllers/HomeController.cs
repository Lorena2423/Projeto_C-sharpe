using Microsoft.AspNetCore.Mvc;

namespace Sistema_processos.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
