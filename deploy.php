<?php

namespace Deployer;

require 'recipe/common.php';

set('n', 'n --offline exec 20');
set('bin/npm', '{{n}} npm');
set('repository', 'git@github.com:SlovakNationalGallery/sbirky-moravska-galerie.git');

add('shared_files', ['.env']);

host('test')
    ->set('hostname', 'webumenia.sk')
    ->set('remote_user', 'lab_sng')
    ->set('app_name', 'TestSbirkyMoravskaGalerie')
    ->set('deploy_path', '/var/www/test.sbirky.moravska-galerie.cz');

task('build', function () {
    cd('{{release_path}}');
    run('{{bin/npm}} ci');
    run('{{bin/npm}} run build');
});

after('deploy:symlink', function () {
    run('{{n}} pm2 reload {{app_name}}');
});

after('deploy:prepare', 'build');
after('deploy:failed', 'deploy:unlock');