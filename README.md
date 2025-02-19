# Guía de instalación del proyecto angular

## Instalaciones necesarias

- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJS v20 o mayor](https://nodejs.org/)

## Antes de comenzar

Antes de comenzar a instalar las dependencias del proyecto es necesario verificar que tienes las dependencias necesarias instaladas.
Abre la terminal de comandos de tu sistema y sigue los siguientes pasos para asegurarte de que todo está correcto antes de comenzar.

### Verificar instalación de NodeJS

```
node -v
```

- Verifica que tu versión de node sea una versión 20 o mayor, si no ve [al sitio oficial y descarga la última versión LTS](https://nodejs.org/)

### Verificar la política de ejecución de scripts

- Estaremos trabajando con Nx, una herramienta que nos permite construir aplicaciones de una forma sencilla a través de Monorepo por lo que vas a estar ejecutando comandos desde el CLI de la herramienta. En el caso del sistema operativo Windows esto puede dar problemas debido a que la configuración para ejecutar comandos de herramientas externas está desactivado. Para activarlo sigue los siguientes pasos:

- Abre una terminal de Windows Powershell como administrador
- Ejecuta el siguiente comando:

```
Get-ExecutionPolicy -List
```

- Deberías ver algo como esto:

```
     Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Restricted
 LocalMachine       Restricted
```

- La configuración que nos interesa es la de CurrentUser, debemos cambiarla a RemoteSigned, para ello, ejecuta el siguiente comando:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- Confirma la ejecución del comando
- Vuelve a comprobar la política de ejecución:

```
Get-ExecutionPolicy -List
```

- Deberías ver esto:

```
    Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       RemoteSigned
 LocalMachine       Restricted
```

### Instalar Angular


- Ejecuta el siguiente comando para instalar Angular:

```
npm install -g @angular/cli
```

- Verifica que nx se haya instalado:

```
ng version
```

- Deberías ver la dependencia instalada:

```
+-- Angular CLI: 18.2.1  
```


## Levantar el frontend de la aplicación

La aplicación está construida usando un frontend en Angular, para ejecutar el servidor de desarrollo frontend debes ejecutar el siguiente comando:

```
ng serve 
```

Donde frontend representa la carpeta del proyecto.


<h3 align="center">¡Listo! Has terminado de correr el Frontend 🥳</h3>
