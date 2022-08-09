import { PrismaClient } from "@prisma/client";
import { expect } from 'chai';
import { describe, it } from "mocha";
import * as userRepository from '../src/repository/user.repository';

const prisma = new PrismaClient();

describe('User repository', () => {
    describe('#save()', () => {
        it('User should be saved in database', async () => {
            await userRepository.save({
                username: "Test",
                password: "Test"
            });
            const users = await prisma.user.findMany({
                where: {
                    username: {
                        equals: "Test"
                    }
                }
            });
            expect(users.length).greaterThan(0);
        });
    });
});

