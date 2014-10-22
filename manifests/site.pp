package {
  'apache2':
    ensure => installed;
}

file {
  '/etc/apache2/sites-enabled/000-default.conf':
    ensure  => file,
    source  => 'file:///vagrant/manifests/files/000-default.conf',
    require => Package['apache2'],
    notify  => Service['apache2'];
}

service {
  'apache2':
    ensure => running;
}

define apache_module () {
    exec {
      "Enable apache module ${name}":
        command => "/usr/sbin/a2enmod $name",
        unless => "/bin/ls /etc/apache2/mods-enabled | grep '$name'",
        before => Service["apache2"],
        notify => Service["apache2"],
        require => Package["apache2"];
    }
}

apache_module {
  ['rewrite', 'proxy', 'proxy_http', 'proxy_html', 'ssl', 'headers']:
    notify => Service['apache2'];
}
