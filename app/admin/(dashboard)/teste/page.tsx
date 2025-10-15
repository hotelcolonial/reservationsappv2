"use client";

"use client";

import { useSupabase } from "@/lib/supabase/supabaseProvider";
import { useEffect, useState } from "react";
useSupabase;

// Suponiendo que una reservación tiene esta estructura
interface Reservation {
  id: number;
  name: string;
  email: string;
  // ...y otras propiedades
}

export default function ReservationsList() {
  // Usa tu hook para obtener el cliente de Supabase
  const { supabase } = useSupabase();

  // --- PASOS CLAVE PARA LA GESTIÓN DE ESTADO ---
  // 1. Un estado para guardar los datos recibidos
  const [reservations, setReservations] = useState<Reservation[]>([]);
  // 2. Un estado para saber si estamos cargando
  const [loading, setLoading] = useState(true);
  // 3. Un estado para manejar posibles errores
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La función que obtiene los datos
    const fetchReservations = async () => {
      // Importante: No hacer nada si el cliente de Supabase aún no está listo
      if (!supabase) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // La llamada a la API que ya sabemos que funciona
        const { data, error } = await supabase.from("reservations").select("*");

        if (error) {
          // Si Supabase devuelve un error, lo lanzamos
          throw error;
        }

        // ¡EL PASO MÁS IMPORTANTE!
        // Guardamos los datos recibidos en nuestra variable de estado.
        setReservations(data || []);
      } catch (err: any) {
        console.error("Error al obtener las reservaciones:", err);
        setError(err.message);
      } finally {
        // Al final, dejamos de cargar
        setLoading(false);
      }
    };

    fetchReservations();
  }, [supabase]); // El efecto se ejecuta cuando el cliente de 'supabase' está listo

  // --- LÓGICA DE RENDERIZADO ---
  if (loading) {
    return <div>Cargando reservaciones...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Reservaciones ({reservations.length})</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* "use client";

import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Como este archivo es la página, lo exportamos por defecto.
export default function TestePage() {
  const { session, isLoaded } = useSession();
  const [claims, setClaims] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo proceder si Clerk ha terminado de cargar y hay una sesión activa
    if (isLoaded && session) {
      // session.getToken() devuelve una promesa que se resuelve con el token JWT
      session.getToken().then((token) => {
        if (token) {
          try {
            // Un JWT tiene 3 partes. La del medio es el payload (los claims).
            const payload = token.split(".")[1];
            // 'atob' es una función del navegador que decodifica una cadena Base64.
            const decodedJson = atob(payload);
            // Parsea el string JSON a un objeto de JavaScript.
            setClaims(JSON.parse(decodedJson));
          } catch (error) {
            console.error("Falha ao decodificar o token JWT:", error);
            setClaims({ error: "Não foi possível decodificar o token." });
          }
        }
        setIsLoading(false);
      });
    } else if (isLoaded) {
      // Si Clerk cargó pero no hay sesión
      setIsLoading(false);
    }
  }, [session, isLoaded]); // Este efecto se ejecuta cuando la sesión o el estado de carga cambian

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">
        Página de Teste - Visor de JWT
      </h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Conteúdo do Token JWT (Cliente)</CardTitle>
          <CardDescription>
            Informações decodificadas do token da sessão atual do Clerk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[220px]" />
            </div>
          )}

          {!isLoading && claims && (
            <pre className="mt-2 p-4 bg-muted rounded-md overflow-x-auto text-sm">
              <code>{JSON.stringify(claims, null, 2)}</code>
            </pre>
          )}

          {!isLoading && !claims && (
            <p className="text-muted-foreground">
              Nenhuma sessão ativa encontrada. Por favor, inicie a sessão.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
 */
/* 
"use client";

import { useSupabase } from "@/lib/supabase/supabaseProvider";
import { useState } from "react";

export default function RpcTester() {
  // Usamos tu propio hook para obtener el cliente de Supabase y el estado de carga.
  const { supabase, isLoaded } = useSupabase();

  const [isLoading, setIsLoading] = useState(false);
  const [rpcResult, setRpcResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTest = async () => {
    // No hacer nada si el cliente de Supabase aún no está listo.
    if (!isLoaded || !supabase) {
      alert("El cliente de Supabase no está listo. ¿Has iniciado sesión?");
      return;
    }

    setIsLoading(true);
    setRpcResult(null);
    setErrorMessage(null);

    try {
      // La llamada clave: usamos el cliente de tu contexto para invocar la función.
      const { data, error } = await supabase.rpc("debug_get_clerk_user_id");

      if (error) {
        throw error;
      }

      setRpcResult(data);
    } catch (error: any) {
      console.error("Error al llamar a la función RPC:", error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg max-w-2xl mx-auto my-8 shadow-md">
      <h2 className="text-xl font-bold mb-2">
        Probador de Función RPC de Supabase
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Este componente utiliza tu `useSupabase` hook para llamar a la función
        de depuración y verificar el `user_id` que Supabase está recibiendo.
      </p>

      <button
        onClick={handleTest}
        // El botón se deshabilita si la prueba está en curso o si el provider aún no ha cargado el cliente.
        disabled={isLoading || !isLoaded}
        className="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading
          ? "Ejecutando..."
          : isLoaded
            ? "Iniciar Prueba RPC"
            : "Cargando cliente..."}
      </button>

      <div className="mt-5 p-4 bg-gray-50 rounded-md min-h-[100px] flex items-center justify-center">
        {isLoading && (
          <p className="text-gray-500 animate-pulse">
            Consultando a Supabase...
          </p>
        )}

        {rpcResult !== null && (
          <div className="w-full">
            <h3 className="font-semibold text-gray-800">
              ✅ Resultado Exitoso:
            </h3>
            <pre className="mt-2 text-lg font-mono bg-black text-green-400 p-3 rounded-md overflow-x-auto">
              {rpcResult === null ? "null" : JSON.stringify(rpcResult, null, 2)}
            </pre>
          </div>
        )}

        {errorMessage && (
          <div className="w-full">
            <h3 className="font-semibold text-red-800">❌ Error:</h3>
            <pre className="mt-2 font-mono bg-red-900 text-white p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
              {errorMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
 */
