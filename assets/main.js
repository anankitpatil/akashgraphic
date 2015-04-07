$(document).ready(function(e) {
	
	$(window).load(function(e){
		
		//Variables
		var container = document.getElementById('canvas');
		var camera, scene, renderer, light, group, scrl;
		var height = $('#canvas').height();
		var width = $('#canvas').width();
		var navbar = $('.navbar').offset().top;
		var nav = 0;
	
		//3d background
		camera = new THREE.PerspectiveCamera(24, width / height, 1, 10000);
		camera.position.z = 15;
		scene = new THREE.Scene();
		light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 0, 1);
		scene.add(light);
		var faceIndices = ['a', 'b', 'c', 'd'];
		var color, f, f2, f3, p, n, vertexIndex, 
		geometry = new THREE.IcosahedronGeometry(8, 0);
		var materials = [
			new THREE.MeshLambertMaterial({
				color: 0xffffff,
				shading: THREE.FlatShading,
				vertexColors: THREE.VertexColors
			}),
			new THREE.MeshBasicMaterial({
				color: 0xCCCCCC,
				shading: THREE.FlatShading,
				wireframe: true,
				transparent: true
			})
		];
		group = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
		var shft = 1.2;
		group.position.x = 0;
		group.rotation.y = 0 + shft;
		scene.add(group);
		renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});//CanvasRenderer({antialias: true, alpha: true});
		renderer.setSize(width, height);
		renderer.setClearColor( 0xffffff );
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
		container.appendChild(renderer.domElement);
		
		//Fade in on load
		$('.fadein').each(function(i, element) {
			if($(element).attr('id') == 'canvas') $(element).delay(i * 300).animate({'opacity': 0.45}, 300);
			else $(element).delay(i * 90).animate({'opacity': 1}, 300);
		});
		
		//Navbar
		$('.flow .container').append($('.navbar').html()).addClass('navbar');
		
		//Smooth scroll to content
		$('.navbar .nav li a').click(function(e){
			e.preventDefault();
			$('html, body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top - 72}, 600, 'easeOutCubic');
		});
		
		//Scroll functions
		$(window).scroll(function(){
			scrl = $(window).scrollTop();
			$('.flash').html(scrl);
			//Ico rotations
			group.rotation.y = shft + scrl * 0.0005;
			group.rotation.z = scrl * 0.0005;
			renderer.render(scene, camera);
			//Navbar
			if(scrl >= $('.navbar.fadein').offset().top && nav == 0){
				$('.flow').stop().animate({'opacity': 1}, 300);
				nav = 1;
			} else if(scrl < $('.navbar.fadein').offset().top && nav == 1) {
				$('.flow').stop().animate({'opacity': 0}, 300);
				nav = 0;
			}
		});
		
		//Resize functions
		$(window).resize(function(){
			height = $('#canvas').height();
			width = $('#canvas').width();
			//3d background
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
			renderer.render(scene, camera);
		});
	});

});

/*
	resz: function(camera, renderer, width, height){
		
	},
	animate: function(camera, scene, renderer, group){
    	akash.render(camera, scene, renderer, group);
	},
	render: function(camera, scene, renderer, group){
		//group.rotation.x = $(window).scrollTop();
		camera.lookAt(scene.position);
		renderer.render(scene, camera);	
	}
}*/