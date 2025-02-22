﻿// See https://aka.ms/new-console-template for more information
using NextGenSoftware.CLI.Engine;
using NextGenSoftware.OASIS.API.Core.Helpers;
using NextGenSoftware.OASIS.API.Native.EndPoint;

Console.WriteLine("NextGen Software OASIS API Manager Test Harness");

OASISAPI API = new OASISAPI();

CLIEngine.ShowWorkingMessage("Booting OASIS...");
OASISResult<bool> bootResult = API.BootOASIS();

if (!bootResult.IsError && bootResult.Result)
{
    CLIEngine.ShowSuccessMessage("OASIS BOOTED");


}
else
    CLIEngine.ShowErrorMessage($"Error booting OASIS. Reason: {bootResult.Message}");