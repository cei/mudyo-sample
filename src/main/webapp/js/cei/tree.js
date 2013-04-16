var Tree = function( id ) {
	const def = {
		PARENT: "data-parent",
		ORDER: "data-order",
		CODE: "data-code"
	};

	//field set
	var element = $(id),
		dragging = false,
		selectedElement = null,
		edited = {};

	//constructor
	$( "a", element ).mouseover( function ( e ) {
		if ( dragging ) {
			var li = $ ( this ).parent ();
			if ( li .is ( "parent" ) && ! li .is ( "open" ) ) {
				openclose ( li );
			}
		}
	}).click( function( e ) {
		var li = $( this ) .parent();
		selected( li );

		e .stopPropagation();
	}).dblclick( function( e ) {
		var li = $(this).parent();
		if( li.hasClass( "parent" ) ) {
			openclose( li );
		}
		
		e.stopPropagation();
	}).draggable({
		revert: "invalid",
		revertDuration: 300,
		helper: "clone",
		opacity: .7,
		containment: ".cei-tree",
		start: function( e, d ) {
			dragging = true;
		},
		stop: function( e, d ) {
			dragging = false;
		}
	}).droppable({
		drop: function(e, d) {
			var ul = $(this).next(),
				src = d.draggable.parent(),
				desc = $(this).parent(),
				params = [];

//드래그한 기존 항목의 순서 변경 저장  
			src.parent().find("> li").each(function(i, el) {
				if (el != src[0]) {
					el.setAttribute(def.ORDER, i);

					params.push({
						code:	el .getAttribute( def.CODE ),
						order:	i
					});
				}
			});

//드랍시킨 이후 항목의 순서 변경 저장 
			ul.find("> li").each(function( i, el ) {
				el.setAttribute(def.ORDER, i);

				params.push({
					code:	el.getAttribute(def.CODE),
					order:	i
				});
			});

//옮겨진 항목의 변경내용 저장 
			params.push({
				code:	src.attr(def.CODE),
				parent: desc.attr(def.CODE),
				order:	ul.find("> li").length
			});

//변경된 내용 서버 전송
			$.ajax({
				url:	"./edit",
				data:	JSON.stringify(params),
				
			});
			
			
//기존 폴더가 없으면 폴더 생성
			if (ul == null || ul.length === 0) {
				ul = desc.addClass("parent").append("<ul>").find("> ul");
			}

//기존에 드래그요소가 마지막이었다면, 대체 마무리요소 처리
			if (src.is(".last")) {
				src.prev().addClass( "last" );
			}

//드래그된 곳으로 항목 넣고 기존 마지막 항목의 클립제거 
			ul.find("> .last ").removeClass("last");
			ul.append(src.addClass ("last"));

			selected(src);
		}
	});

	$ ( "span.clip", element ) .click( function( e ) {
		var li = $ ( this ) .parent ();
		if ( li .hasClass( "parent" ) ) {
			openclose( li );
		}
		
		e .stopPropagation();
	});
	
	//최상위(루트)요소 드래그 금지
	$( "> li > a", element ) .draggable( "destroy" );

	var
	selected = function ( li ) {
		
		//기존 선택요소 확인 후, 선택 해제
		if ( selectedElement !== null ) {
			selectedElement .removeClass ( "selected" );
		}

		//새로운 선택요소 등록 
		selectedElement = li .addClass ( "selected" );

		open ( li );
	},
	open = function ( arg ) {
		var li = null;
		
		if ( typeof arg === "string" ) {
			li = $ ( "li[data-code=" + code + "]", element );
			
		}
		else if ( arg .is ( "li[data-code]" ) ) {
			li = arg;
		}

		while ( ( li = li .parent () .parent () ) .is ( "li[data-code]" ) ) {
			if ( li .is ( ".open" ) ) {
				break;
			}

			li .addClass ( "open" ) .removeClass ( "close" ) .find( "> ul" ) .show ( "blind" );
		}
	},
	openclose = function( li ) {
		if( !li.hasClass( "open" ) ) {
			li.addClass( "open" ).removeClass( "close" ).find( ">ul" ).show( "blind" );
		}
		else {
			li.addClass( "close" ).removeClass( "open" ).find( ">ul" ).hide( "blind" );
		}		
	};

	return {
		getEdited: edited
	};
};