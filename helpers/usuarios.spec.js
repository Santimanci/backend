import { describe, it, expect, vi } from 'vitest';
import { validarEmail } from '../helpers/usuarios.js';
import { Usuario } from '../models/usuario.js';
import { validarExisteUsuario } from './pagos.js';
// Mockeamos el modelo de Usuario
vi.mock('../models/usuario.js', () => ({
    Usuario: {
        findOne: vi.fn(),
        findById: vi.fn()
    }
}));

describe('validarEmail', () => {
    it('debería lanzar un error si el email ya existe', async () => {
        // Simulamos que el usuario SI existe en la DB
        Usuario.findOne.mockResolvedValue({ email: 'test@correo.com' });

        await expect(validarEmail('test@correo.com'))
            .rejects.toThrow('el correo test@correo.com ya esta registrado');
    });

    it('no debería lanzar nada si el email no existe', async () => {
        // Simulamos que el usuario NO existe
        Usuario.findOne.mockResolvedValue(null);

        await expect(validarEmail('nuevo@correo.com'))
            .resolves.not.toThrow();
    });

});

describe('validarExisteUsuario', () => {
    it('Deberia lanzar error si el usuario no esta registrado', async () => {
        // Simulamos que el usuario NO existe
        usuario.findById.mockResolvedValue(null);

        await expect(validarExisteUsuario('abc123'))
            .rejects.toThrow('El usuario con ID abc123 no está registrado');
    });
});
