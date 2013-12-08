require 'taglib'
require 'sinatra'
require 'haml'
require 'json'

def read_mp3s
	files = Dir['public/mp3s/**/*.mp3']

	mp3_files = Array.new

	files.each do |file|
		TagLib::FileRef.open(file) do |fileref|
			unless fileref.null?
    			tag = fileref.tag

    			mp3_files << {:path => file.sub('public/',''),
                        :title => tag.title,
                        :artist => tag.artist,
                        :genre => tag.genre}
    		end
  		end
	end  # File is automatically closed at block end

	mp3_files
end

$mp3_files = read_mp3s

get '/' do
	haml :home
end

get '/files/:filterString?:max?' do
	filter_by = params[:filterString].downcase
	max_returned = params[:max].nil? ? 500 : params[:max].to_i
	$mp3_files.select{|item| include_item?(item, filter_by) }.take(max_returned).to_json
end

def include_item?(item, filter_string)
	check_value(item[:title], filter_string) ||
  check_value(item[:artist], filter_string) ||
  check_value(item[:genre], filter_string)
end

def check_value(value, string_to_check)
  value.nil? ? false : value.downcase.include?(string_to_check)
end



