<?php

namespace Deployer;

require 'recipe/common.php';

set('bin/npm', 'n exec 20 npm');
set('repository', 'git@github.com:SlovakNationalGallery/sbirky-moravska-galerie.git');

add('shared_files', ['.env']);

host('test')
    ->set('hostname', 'webumenia.sk')
    ->set('remote_user', 'lab_sng')
    ->set('app_name', 'TestSbirkyMoravskaGalerie')
    ->set('deploy_path', '/var/www/test.sbirky.moravska-galerie.cz');

task('build', function () {
    cd('{{release_path}}');
    run('{{bin/npm}} install');
    run('{{bin/npm}} run build');
});

after('deploy:symlink', function () {
    run('pm2 reload {{app_name}}');
});

after('deploy:prepare', 'build');
after('deploy:failed', 'deploy:unlock');