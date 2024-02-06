import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('profile')
export class ProfileController {

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(Role.Admin)
    profile(){
        return {message:'This is a protected route.'}
    }
}
